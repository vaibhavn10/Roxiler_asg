import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function Topbar({ setSearch, getMonths, setMonth }) {
  const [showOptions, setShowOpts] = useState(false);
  const toggleShowOpts = () => {
    setShowOpts((prev) => !prev);
  };
  const btnRef = useRef(null);
  const monthsOptions = [
    { name: "Jan", month: 1 },
    { name: "Feb", month: 2 },
    { name: "Mar", month: 3 },
    { name: "Apr", month: 4 },
    { name: "May", month: 5 },
    { name: "June", month: 6 },
    { name: "July", month: 7 },
    { name: "Aug", month: 8 },
    { name: "Sept", month: 9 },
    { name: "Oct", month: 10 },
    { name: "Nov", month: 11 },
    { name: "Dec", month: 12 },
  ];

  const [query, setquery] = useState("");
  const handleSearch = () => {
    setSearch(query);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (btnRef.current && btnRef.current.contains(event.target)) {
        setShowOpts(true);
      }
      if (btnRef.current && !btnRef.current.contains(event.target)) {
        setShowOpts(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="px-4 sm:px-10 md:px-24 py-4 flex items-center justify-between">
      <div className="flex items-center justify-between gap-4">
        <input
          type="text"
          onChange={(e) => {
            setquery(e.target.value);
            if (e.target.value == "") {
              setSearch("");
            }
          }}
          className="border-0 ring-0 border-b border-yellow-300 text-sm focus:ring-0 focus:border-yellow-500"
          placeholder="Search..."
        />
        <button
          onClick={handleSearch}
          disabled={query.length == 0}
          className="py-2 px-6 rounded-full bg-yellow-500 text-yellow-900 text-sm"
        >
          Search transaction
        </button>
      </div>
      <div className="flex flex-col relative" ref={btnRef}>
        <button
          className="w-32 py-2 px-4 rounded-sm bg-yellow-500 text-yellow-900"
          id="month-btn"
        >
          {getMonths()}
        </button>
        <div
          className={`absolute top-full right-0 pt-1 bg-white ${
            showOptions
              ? "opacity-1 translate-y-0 h-max w-max block"
              : "opacity-0 -translate-y-4 h-0 w-0 overflow-hidden hidden"
          } duration-200`}
        >
          <div className="flex flex-col justify-between max-h-64 w-48 border border-yellow-500 rounded-sm overflow-y-scroll text-yellow-800 scrollbarnone">
            {monthsOptions.map((m, i) => {
              return (
                <button
                  key={m.month}
                  className="py-2 px-2 dropdownTab cursor-pointer"
                  onClick={() => {
                    setMonth(m.month);
                    toggleShowOpts();
                  }}
                >
                  {m.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
