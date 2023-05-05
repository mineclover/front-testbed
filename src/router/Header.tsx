import { Outlet } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <a href="/">Home</a>
      <Outlet />
    </header>
  );
};

export default Header;
