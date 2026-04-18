import { IoMdNotificationsOutline } from "react-icons/io";
import { LuMessageSquareText } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import Button from "./Button";
import UserInfo from "./UserInfo";
import Menu from "./Menu";
import { useAuth } from "../context/AuthContext";

const icons = [
  {
    icon: <IoMdNotificationsOutline className="text-[2.2rem]" />,
    to: "/notifications",
  },
  {
    icon: <LuMessageSquareText className="text-[2rem]" />,
    to: "/messages",
  },
];

function Navbar() {
  const { authenticated, login } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 h-[80px] flex items-center z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/60 shadow-sm w-full">
      <div className="max-w-[1440px] w-full mx-auto px-6 flex items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <Logo />
          <Menu />
        </div>

        <div className="flex-1 max-w-5xl hidden md:block">
          <SearchBar />
        </div>

        <div className="flex items-center gap-2">
          {authenticated ? (
            <>
              <ul className="flex items-center gap-1 mr-2">
                {icons.map(({ icon: Icon, to }, index) => (
                  <li key={index}>
                    <Link
                      to={to}
                      className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:text-rose-500 hover:bg-rose-50 transition-colors duration-200"
                    >
                      {Icon}
                    </Link>
                  </li>
                ))}
              </ul>
              <UserInfo />
              <Link to="/create-post" className="ml-3 hidden sm:block">
                <Button variant="primary" className="!py-2.5 !px-5 !rounded-xl shadow-md shadow-rose-500/20 whitespace-nowrap">
                  Đăng tin
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Button
                onClick={() => login()}
                variant="ghost"
                className="!py-2.5 !px-5 font-semibold text-gray-700 hover:text-rose-500 hidden sm:block whitespace-nowrap"
              >
                Đăng nhập
              </Button>
              <Button
                onClick={() => navigate("/auth/register")}
                variant="primary"
                className="!py-2.5 !px-5 !rounded-xl shadow-md shadow-rose-500/20 whitespace-nowrap"
              >
                Đăng ký
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
