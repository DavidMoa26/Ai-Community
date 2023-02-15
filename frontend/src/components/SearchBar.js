import React from 'react';

const SearchBar = ({ onChange, searchFor }) => {
    return (
        <div className="relative w-64 mx-auto mt-8 mb-2">
            <input
                className="bg-gray-200 rounded-full py-2 pr-4 pl-10 w-full text-gray-700 focus:outline-none focus:shadow-outline"
                type="text"
                placeholder={`Search ${searchFor}`}
                onChange={onChange}
            />
            <button
                className="absolute right-0 top-0 mt-3 mr-4"
            >
                <svg
                    className="fill-current text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                >
                    <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
                </svg>
            </button>
        </div>
    );
};

export default SearchBar;
