import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

function Logo() {
  const navigate = useNavigate();
  const handleClick = useCallback(() => navigate("/"), [navigate]);

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer flex-shrink-0 hover:opacity-80 transition-opacity duration-200 flex items-center"
    >
      <img
        className="h-[100px] w-auto object-contain transform scale-110 origin-left"
        src="/logo.png"
        alt="TLand Logo"
      />
    </div>
  );
}

export default Logo;
