import { IoMdNotificationsOutline } from "react-icons/io";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import { LuMessageSquareText } from "react-icons/lu";
import Button from "./Button";
import UserInfo from "./UserInfo";
import { Link } from "react-router-dom";
import Menu from "./Menu";

const icons = [
  {
    icon: <IoMdNotificationsOutline />,
    to: "/notifications",
  },
  {
    icon: <LuMessageSquareText />,
    to: "/messages",
  },
];
function Navbar() {
  return (
    <header className="flex items-center justify-around text-black text-3xl px-4 shadow-md gap-4">
      <Logo />
      <Menu />
      <SearchBar />
      <ul className="flex text-4xl justify-center gap-4">
        {icons.map(({ icon: Icon, to }, index) => (
          <li className="px-4" key={index}>
            <Link to={to}>
              {Icon}
            </Link>
          </li>
        ))}
      </ul>
      <UserInfo />
      <Link to="/create-post">
        <Button variant="primary">
          <span className="font-bold"> Đăng tin</span>
        </Button>
      </Link>
    </header>

  );
}

export default Navbar;
