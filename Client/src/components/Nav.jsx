import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../App.css";

function Nav() {
  const { updatedAvatar } = useSelector((state) => state.user);
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchT = urlParams.get("searchTerm");
    if (searchT) {
      setSearchTerm(searchT);
    }
  }, [location.search]);

  return (
    <>
      <header className="bg-black p-4  rounded-b-lg border-b-0.5 border-b-white w-full  shadow-2xl">
        <div className="flex justify-between mx-auto max-w-7xl p-3 items-center">
          <Link to="/">
            <h1 className="font-bold  sm:text-3xl flex flex-wrap">
              <span className="text-red-800 underline">Brick</span>
              <span className="text-black outlined-text underline">By</span>
              <span className="text-red-800 underline">Brick</span>
            </h1>
          </Link>

          <form onSubmit={handleSubmit} className="bg-transparent  relative">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              className="text-white rounded-full bg-neutral-900 border border-neutral-700 focus:outline-none p-3 font-serif w-40 sm:w-80"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button>
              <SearchIcon
                sx={{ color: "white" }}
                className="absolute right-2  top-1/2 transform -translate-y-1/2"
              />
            </button>
          </form>

          <ul className="flex gap-6 text-white">
            <Link to="/">
              <li className="hidden sm:inline hover:underline">Home</li>
            </Link>
            <Link to="/about">
              <li className="hidden sm:inline hover:underline">About</li>
            </Link>

            {currentUser ? (
              <Link to="/profile">
                <img
                  className="rounded-full h-7 w-7 object-cover"
                  src={
                    currentUser.avatar != null
                      ? currentUser.avatar
                      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  }
                />
              </Link>
            ) : (
              <Link to="/sign-in">
                <li className="hidden sm:inline hover:underline">Sign In</li>
              </Link>
            )}
          </ul>
        </div>
      </header>
    </>
  );
}

export default Nav;
