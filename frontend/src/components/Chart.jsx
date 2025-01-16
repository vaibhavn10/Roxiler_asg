import React from "react";

function Chart({ month, getMonths }) {
  const Bar = ({ height }) => {
    return (
      <div className={`w-12 h-[${height}] bg-cyan-300 rounded-t-[5px]`}></div>
    );
  };
  return (
    <div className="px-4 sm:px-10 md:px-24 mb-24">
      <div className="text-xl md:text-2xl font-semibold mb-6">
        Bar Chart Stats - {getMonths()}
      </div>
      <div className="flex flex-col items-start py-6 w-full md:w-max h-max text-sm">
        <div className="flex items-end h-[16rem] w-full">
          <div className="flex flex-col justify-between h-full w-16 text-center gap-6 justify-end">
            <div className="">80</div>
            <div className="">60</div>
            <div className="">40</div>
            <div className="">20</div>
            <div className="">0</div>
          </div>
          <div className="flex flex-1 items-end justify-between h-full gap-4 border-b pb-[1px]">
            <Bar height={"10%"} />
            <Bar height={"20%"} />
            <Bar height={"30%"} />
            <Bar height={"50%"} />
            <Bar height={"45%"} />
            <Bar height={"25%"} />
            <Bar height={"25%"} />
            <Bar height={"25%"} />
            <Bar height={"25%"} />
            <Bar height={"25%"} />
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-16 text-center"></div>
          <div className="flex flex-1 items-center justify-between text-sm gap-4">
            <div className="text-center w-12">
              <div className="w-max translate-y-6 rotate-[-45deg]">0-100</div>
            </div>
            <div className="text-center w-12">
              <div className="w-max translate-y-6 rotate-[-45deg]">101-200</div>
            </div>
            <div className="text-center w-12">
              <div className="w-max translate-y-6 rotate-[-45deg]">201-300</div>
            </div>
            <div className="text-center w-12">
              <div className="w-max translate-y-6 rotate-[-45deg]">301-400</div>
            </div>
            <div className="text-center w-12">
              <div className="w-max translate-y-6 rotate-[-45deg]">401-500</div>
            </div>
            <div className="text-center w-12">
              <div className="w-max translate-y-6 rotate-[-45deg]">501-600</div>
            </div>
            <div className="text-center w-12">
              <div className="w-max translate-y-6 rotate-[-45deg]">601-700</div>
            </div>
            <div className="text-center w-12">
              <div className="w-max translate-y-6 rotate-[-45deg]">701-800</div>
            </div>
            <div className="text-center w-12">
              <div className="w-max translate-y-6 rotate-[-45deg]">801-900</div>
            </div>
            <div className="text-center w-12">
              <div className="w-max translate-y-6 rotate-[-45deg]">
                901 above
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chart;
