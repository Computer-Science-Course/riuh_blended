import { useContext, useEffect } from 'react';
import 'typeface-inter';
import 'typeface-ibm-plex-mono';
import { AuthContext } from './context/AuthContext';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Footer from './components/Footer';
import Menu from './components/Menu';
import ExitButton from './components/ExitButton';

const containerStyles = 'w-full h-screen flex flex-col bg-black-900 gap-3 px-4 py-4';
const topBoxStyles = 'w-full h-full flex gap-3';
const sideBarStyles = 'h-full w-max flex flex-col justify-between rounded-lg py-8 bg-black-700 border border-black-400';
const contentStyles = 'h-full w-full flex justify-center items-center rounded-lg bg-black-700 border border-black-400 text-white-900';

const App = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated]);

  return (
    <div className={containerStyles}>
      <div className={topBoxStyles}>
        <div className={sideBarStyles}>
          <Menu
            cashierAction={() => navigate('/caixa')}
            clientAction={() => navigate('/cliente')}
            employeeAction={() => navigate('/funcionario')}
            productAction={() => navigate('/produto')}
            reportAction={() => navigate('/relatorio')}
          />
          <ExitButton onClick={logout} />
        </div>
        <div className={contentStyles}>
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
