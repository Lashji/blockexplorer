import { useState } from "react";
import { useHistory } from "react-router-dom";

const AddressSearch = () => {
  const [searchValue, setSearchValue] = useState("");
  const history = useHistory();

  const handleClick = () => {
    if (searchValue === "") return;

    if (searchValue.length !== 42) {
      alert("Please enter a valid address");
      return;
    }

    history.push(`/address/${searchValue}`);
  };

  return (
    <div className="bg-white h-14 dark:bg-blue-950 w-full self-stretch  rounded-md overflow-hidden shadow-md flex items-center">
      <input
        className="w-full py-2 px-3 text-gray-700 dark:text-gray-300 bg-transparent focus:outline-none"
        type="text"
        placeholder="Search Address"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button
        className="bg-blue-950 text-white w-14 h-14 flex items-center justify-center"
        onClick={handleClick}
      >
        <svg
          className="w-6 h-6 mx-3 text-gray-500 dark:text-gray-300"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l5.364 5.363a1 1 0 01-1.414 1.414l-5.364-5.363A6 6 0 012 8z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default AddressSearch;
