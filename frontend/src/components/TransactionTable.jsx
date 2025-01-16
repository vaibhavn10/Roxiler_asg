import React, { useEffect, useState } from "react";

function TransactionTable({ search, month, getMonths }) {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10;

  const fetchData = async (p) => {
    const newPage = p;
    const prevJsonData = transactions;
    let url = `http://localhost:3000/alltransactions?page=${newPage}&limit=${limit}&month=${getMonths()}`;
    if (search) {
      url = `http://localhost:3000/alltransactions?search=${search}&page=${newPage}&limit=${limit}&month=${getMonths()}`;
    }
    const response = await fetch(url);
    const jsonData = await response.json();
    setTransactions(jsonData);
    if (jsonData.msg == "No data found." && newPage > 1) {
      setTransactions(prevJsonData);
      setPage(newPage - 1);
    }
  };
  useEffect(() => {
    setPage(1);
    fetchData(1);
  }, [month]);
  useEffect(() => {
    fetchData(page);
  }, [page, search]);

  return (
    <div className="px-4 sm:px-10 md:px-24 py-24">
      <div className="w-full overflow-x-auto scrollbar-none">
        <table className="w-full">
          <thead>
            <tr className="w-full bg-yellow-400 flex items-center gap-2">
              <th className="flex-1 py-2 text-yellow-800">ID</th>
              <th className="flex-1 py-2 text-yellow-800">Title</th>
              <th className="flex-1 py-2 text-yellow-800">Description</th>
              <th className="flex-1 py-2 text-yellow-800">Price</th>
              <th className="flex-1 py-2 text-yellow-800">Category</th>
              <th className="flex-1 py-2 text-yellow-800">Sold</th>
              <th className="flex-1 py-2 text-yellow-800">Image</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((trx, idx) => {
                return (
                  <tr
                    className="w-full flex items-start justify-center text-start text-sm py-1 bg-yellow-300 gap-2"
                    key={trx._id}
                  >
                    <td className="flex-1 py-3 flex items-center justify-center px-auto flex-wrap overflow-auto scrollbarnone">
                      {trx.id}
                    </td>
                    <td className="flex-1 py-3 flex items-center justify-center px-auto flex-wrap overflow-auto scrollbarnone">
                      {trx.title}
                    </td>
                    <td className="flex-1 py-3 flex items-center justify-center px-auto flex-wrap overflow-auto scrollbarnone">
                      {trx.description.slice(0, 50)}...
                    </td>
                    <td className="flex-1 py-3 flex items-center justify-center px-auto flex-wrap overflow-auto scrollbarnone">
                      {trx.price}
                    </td>
                    <td className="flex-1 py-3 flex items-center justify-center px-auto flex-wrap overflow-auto scrollbarnone">
                      {trx.category}
                    </td>
                    <td className="flex-1 py-3 flex items-center justify-center px-auto flex-wrap overflow-auto scrollbarnone">
                      {trx.sold ? "Yes" : "No"}
                    </td>
                    <td className="flex-1 py-3 h-full flex items-center px-auto flex-wrap overflow-auto scrollbarnone">
                      <a href={trx.image} target="_blank">
                        {trx.image}
                      </a>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="">
                <td className="py-3 text-center">No transactions available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-center w-full text-sm py-4 px-2">
        <div className="flex-1 ">page No : {page}</div>
        <div className="flex-1 flex items-center justify-center gap-2">
          <button
            className="font-semibold"
            onClick={() => {
              setPage(page + 1);
            }}
          >
            Next
          </button>
          <span>-</span>
          <button
            className="font-semibold"
            onClick={() => {
              if (page > 1) {
                setPage(page - 1);
              }
            }}
          >
            Previous
          </button>
        </div>
        <div className="flex-1 text-end">Per Page : {limit}</div>
      </div>
    </div>
  );
}

export default TransactionTable;
