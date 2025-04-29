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
const Book = React.forwardRef((props, ref) => {
  return (
    <HTMLFlipBook
      ref={ref}
      width={500}
      height={600}
      maxShadowOpacity={0.5}
      className="shadow-lg"
    >
      <div className="page bg-red-200 p-4">Page 1</div>
      <div className="page bg-white p-4">Page 2</div>
      <div className="page bg-white p-4">Page 3</div>
      <div className="page bg-white p-4">Page 4</div>
    </HTMLFlipBook>
  );
});

export default Book;
