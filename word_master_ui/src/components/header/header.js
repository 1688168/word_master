import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <Link to="/">main</Link>
      <Link to="/admin">Admin</Link>
    </>
  );
};

export default Header;
