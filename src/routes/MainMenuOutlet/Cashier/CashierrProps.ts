import { ToastMessage } from "../../../components/Toast/ToastProps";
import { Client } from "../../../entities/Client";
import { Product } from "../../../entities/Product";

/** Handle Sell Props */
export interface HandleSellProps {
  /** Client info. */
  client: Client;
  /** Product info. */
  product: Product;
  /** Setter for toast message. */
  setReturnMessage: (toastMessage: ToastMessage) => void;
  /** Loading state. */
  setIsLoading: (loading: boolean) => void;
}
  