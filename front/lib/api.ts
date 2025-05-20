import axios from "axios"

// Create axios instance with base URL
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // Add a reasonable timeout
})

// Add request interceptor to add auth token
instance.interceptors.request.use(
  (config) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Improve the response interceptor error handling
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // If error is 401 and we haven't tried to refresh token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = typeof window !== "undefined" ? localStorage.getItem("refreshToken") : null

        if (!refreshToken) {
          // No refresh token, redirect to login
          if (typeof window !== "undefined") {
            window.location.href = "/login"
          }
          return Promise.reject(error)
        }

        // Try to get a new token
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/auth/refresh`,
          { refresh_token: refreshToken },
        )

        const { access_token, refresh_token } = response.data

        // Store new tokens
        if (typeof window !== "undefined") {
          localStorage.setItem("accessToken", access_token)
          localStorage.setItem("refreshToken", refresh_token)
        }

        // Update Authorization header
        originalRequest.headers.Authorization = `Bearer ${access_token}`

        // Retry the original request
        return instance(originalRequest)
      } catch (refreshError) {
        // Refresh token failed, redirect to login
        if (typeof window !== "undefined") {
          localStorage.removeItem("accessToken")
          localStorage.removeItem("refreshToken")
          window.location.href = "/login"
        }
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

export const api = {
  get: (url: string, params = {}) => instance.get(url, { params }),
  post: (url: string, data = {}) => instance.post(url, data),
  put: (url: string, data = {}) => instance.put(url, data),
  delete: (url: string, data = {}) => instance.delete(url, { data }),
  setToken: (token: string) => {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`
  },
}
