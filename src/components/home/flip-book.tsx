"use client";
import React from "react";
import HTMLFlipBook from "react-pageflip";

// // eslint-disable-next-line react/display-name
// const Page = React.forwardRef<HTMLDivElement, React.PropsWithChildren>((props, ref) => {
//     return (
//         <div ref={ref} {...props}>
//             {props.children}
//         </div>
//     );
// })
const FlipBookWrapper = () => {
  return (
    <HTMLFlipBook width={300} height={500} className="shadow-lg">
      <div className="page bg-red-200 p-4">Page 1</div>
      <div className="page bg-white p-4">Page 2</div>
      <div className="page bg-white p-4">Page 3</div>
      <div className="page bg-white p-4">Page 4</div>
    </HTMLFlipBook>
  );
};

export default FlipBookWrapper;
