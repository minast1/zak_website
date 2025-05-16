import React from "react";

const Loading = () => {
  return (
    <div className="w-full mt-5 flex items-center gap-1 ml-48">
      {/* <span className="mr-5">Loading</span> */}
      <div className="h-3 w-3 animate-bounce rounded-full bg-[#334155] [animation-delay:-0.3s] dark:bg-[#334155]"></div>
      <div className="h-3 w-3 animate-bounce rounded-full bg-[#334155] [animation-delay:-0.11s] dark:bg-[#334155]"></div>
      <div className="h-3 w-3 animate-bounce rounded-full bg-[#334155] [animation-delay:-0.18s] dark:bg-[#334155]"></div>
      <div className="h-3 w-3 animate-bounce rounded-full bg-[#334155] dark:bg-[#334155]"></div>
    </div>
  );
};

export default Loading;
