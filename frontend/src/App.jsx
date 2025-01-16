import { useState } from "react";
import "./App.css";
import Topbar from "./components/Topbar";
import TransactionTable from "./components/TransactionTable";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Stats from "./components/Stats";
import Chart from "./components/Chart";

function App() {
  const [search, setSearch] = useState("");
  const [month, setMonth] = useState(3);
  const getMonths = () => {
    const months = [
      { name: "January", month: 1 },
      { name: "February", month: 2 },
      { name: "March", month: 3 },
      { name: "April", month: 4 },
      { name: "May", month: 5 },
      { name: "June", month: 6 },
      { name: "July", month: 7 },
      { name: "August", month: 8 },
      { name: "September", month: 9 },
      { name: "October", month: 10 },
      { name: "November", month: 11 },
      { name: "December", month: 12 },
    ];
    return months.find((mon) => month === mon.month)?.name || "Invalid Month";
  };
  return (
    <div className="">
      <BrowserRouter>
        <Topbar
          setSearch={setSearch}
          getMonths={getMonths}
          setMonth={setMonth}
        />
        <Routes>
          <Route
            exact
            path="/"
            element={<TransactionTable search={search} month={month} getMonths={getMonths} />}
          />
          <Route exact path="/stats/:month" element={<TransactionTable />} />
        </Routes>
        {month && <Stats month={month} getMonths={getMonths}/>}
        {month && <Chart month={month} getMonths={getMonths}/>}
      </BrowserRouter>
    </div>
  );
}

export default App;
