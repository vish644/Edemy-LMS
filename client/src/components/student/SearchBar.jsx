import React, { useState } from "react";
import { assets } from "../../assets/assets";
import Button from "../../common/Button";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ data }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState(data ? data : "");

  const onSearchHandler = (e) => {
    e.preventDefault();
    console.log("Submitted input:", input);
    navigate("/course-list/" + input);
  };

  return (
    <form
      onSubmit={onSearchHandler}
      className="flex items-center bg-white border border-gray-500/20 max-w-xl w-full md:h-14 h-12 rounded"
    >
      <img
        src={assets.search_icon}
        alt="search_icon"
        className="md:w-auto w-10 px-3"
      />
      <input
        type="text"
        placeholder="Search for Courses"
        onChange={(e) => setInput(e.target.value)}
        value={input}
        className="w-full h-full outline-none text-gray-500/80"
      />
      <Button
        text={"Search"}
        type="submit"
        className={
          "bg-blue-600 rounded text-white md:px-10 px-7 md:py-3 py-2 mx-1"
        }
      />
    </form>
  );
};

export default SearchBar;
