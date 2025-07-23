import { FaSearch } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";

function SearchBar() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  function search(e) {
    if (e.key === "Enter") {
      // setSearchParams({});
      navigate(`/courses?keyword=${encodeURIComponent(e.target.value)}`);
    }
  }

  return (
    <div className="flex-[0.9] mx-4">
      <div className="relative w-full">
        <input
          onKeyDown={search}
          type="text"
          placeholder="Search for anything"
          className="bg-gray-200 text-black w-full p-5 pr-24 border rounded-lg border-amber-50 focus:outline-none"
        />
        <button
          onClick={search}
          className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer bg-rose-600 text-white px-8 py-3 rounded-md hover:bg-rose-700 transition"
        >
          <FaSearch />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
