"use client";
import React, { useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";
import { Button } from "../ui/button";
import { BiSolidLeftArrow } from "react-icons/bi";
import { BiSolidRightArrow } from "react-icons/bi";
import { useMobile } from "@/hooks/use-mobile";
import clsx from "clsx";

//import pdf from "./ByteBeatJan2024.pdf";
// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.mjs",
//   import.meta.url
// ).toString();
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
// // eslint-disable-next-line react/display-name

const PageCover = React.forwardRef<HTMLDivElement, React.PropsWithChildren>(
  (props, ref) => {
    return (
      <div ref={ref} {...props} className="page page-cover" data-density="hard">
        <div className="page-content">{props.children}</div>
      </div>
    );
  }
);
const FlipBookPage = React.forwardRef<HTMLDivElement, React.PropsWithChildren>(
  (props, ref) => {
    return (
      <div ref={ref} {...props} className="page">
        <div>{props.children}</div>
      </div>
    );
  }
);
const Book = React.forwardRef((props, ref) => {
  const [pageWidth, setPageWidth] = React.useState(400);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isMobile = useMobile();
  const [numPages, setNumPages] = React.useState<number | null>(null);
  const initialPosition = "md:px-auto";
  const [position, setPosition] = React.useState(initialPosition);

  return (
    <section
      className={clsx("md:h-screen w-full bg-black mx-auto", position)}
      ref={containerRef}
    >
      {/* <div className=" bg-black w-[90%] max-w-5xl h-[500px] flex justify-center items-center shadow-lg rounded">
        <Button
          variant={"outline"}
          size={"icon"}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full"
        >
          <BiSolidLeftArrow />
        </Button>
        */}
      <div>
        <Document
          file={`/ByteBeatJan2024.pdf`}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        >
          {numPages && (
            <HTMLFlipBook
              width={isMobile ? 400 : 500}
              onFlip={(e: any) => {
                //console.log(e.data);
                if (e.data === 0) {
                  setPosition(initialPosition);
                } else {
                  setPosition("md:pl-44");
                }
              }}
              height={isMobile ? 500 : 700}
              showCover={true}
              maxShadowOpacity={0.5}
              // flippingTime={500}
              // minWidth={400}
              //minHeight={500}
            >
              {Array.from({ length: numPages }, (_, i) => (
                <div key={i} className="pdf-page">
                  <Page
                    pageNumber={i + 1}
                    width={isMobile ? 400 : 500}
                    renderAnnotationLayer={false}
                    renderTextLayer={false}
                  />
                </div>
              ))}
            </HTMLFlipBook>
          )}
        </Document>
      </div>

      {/*</section>
        <Button
          variant={"outline"}
          size={"icon"}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full"
        >
          <BiSolidRightArrow />
        </Button>
      </div> */}
    </section>
  );
});

export default Book;
