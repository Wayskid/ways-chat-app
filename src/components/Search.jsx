import React, { useContext } from "react";
import ChatAppContext from "../contexts/ChatAppContext";

export default function Search() {
  const { handleSearch, state } = useContext(ChatAppContext);

  return (
    <label className="flex justify-center items-center bg-color-primary h-[50px]">
      <input
        type="text"
        className="search border-b-text-color border-b-[1px] text-center rounded-b-lg outline-none focus:placeholder-transparent placeholder:italic bg-transparent w-[90%]"
        placeholder="Search User"
        onChange={(e) => handleSearch(e.target.value)}
        value={state.search_val}
      />
    </label>
  );
}
