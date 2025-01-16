import React, { useEffect, useState } from "react";

function Stats({ month, getMonths }) {
    const [stats, setStats] = useState(null);
  const getStats = async () => {
    const url = `http://localhost:3000/stats`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ month: getMonths() }),
    });
    const data = await res.json();
    console.log('stats : ', getMonths(), data);
    setStats(data);
  };
  useEffect(() => {
    getStats();
  }, [month]);

  return (
    <div className="px-4 sm:px-10 md:px-24 mb-24">
      <div className="text-xl md:text-2xl font-semibold mb-6">
        Statistics - {getMonths()}
      </div>
      <div className="flex flex-col justify-between gap-2 px-4 py-6 w-full md:w-[40%] lg:w-[20%] bg-yellow-300 rounded-xl text-sm">
        <div className="flex items-center justify-between font-medium">
          <div className="">Total Sale</div>
          <div className="">{stats?.total_sale || "NA"}</div>
        </div>
        <div className="flex items-center justify-between font-medium">
          <div className="">Total sold item</div>
          <div className="">{stats?.total_sold || "NA"}</div>
        </div>
        <div className="flex items-center justify-between font-medium">
          <div className="">Total not sold item</div>
          <div className="">{stats?.total_not_sold || "NA"}</div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
