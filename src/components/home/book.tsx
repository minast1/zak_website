"use client";
import React, { useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";
import { Button } from "../ui/button";
import { BiSolidLeftArrow } from "react-icons/bi";
import { BiSolidRightArrow } from "react-icons/bi";
import { useMobile } from "@/hooks/use-mobile";
import clsx from "clsx";
import { useMediaQuery } from "@/hooks/useMediaQuery";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();
// process.env.NODE_ENV === "production"
//   ? `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`
//   : new URL(
//       "pdfjs-dist/build/pdf.worker.min.mjs",
//       import.meta.url
//     ).toString();
// eslint-disable-next-line react/display-name

const Book = ({ file }: { file: string }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isIphoneSE = useMediaQuery("(max-width: 375px)");
  const isIphoneXR = useMediaQuery("(max-width: 414px)");
  const isIphone12Pro = useMediaQuery("(max-width: 390px)");
  const isIphone14ProMax = useMediaQuery("(max-width: 430px)");
  const isGalaxyS8 = useMediaQuery("(max-width: 360px)");
  const isGalaxyS20 = useMediaQuery("(max-width: 412px)");
  const isIpadMini = useMediaQuery("(max-width: 768px)");

  const isMobile = useMobile();
  const [numPages, setNumPages] = React.useState<number | null>(null);
  const [currentPage, setCurrentPage] = React.useState(0);
  const flipBookRef = React.useRef<HTMLDivElement>(null);
  const initialPosition = "md:px-auto";
  const [position, setPosition] = React.useState(initialPosition);
  const isPageVisible = (pageIndex: number) =>
    Math.abs(pageIndex - currentPage) <= 4;

  return (
    <section className={clsx(" w-screen bg-black", position)}>
      <div className="w-full">
        <Document
          file={file}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        >
          {numPages && (
            <HTMLFlipBook
              ref={flipBookRef}
              width={550}
              height={733}
              size={isMobile ? "stretch" : "fixed"}
              minWidth={315}
              maxWidth={1000}
              minHeight={400}
              maxHeight={1500}
              onFlip={(e: any) => {
                //console.log(e.data);
                if (e.data === 0) {
                  setCurrentPage(e.data);
                  setPosition(initialPosition);
                } else {
                  setCurrentPage(e.data);
                  setPosition("md:pl-40");
                }
              }}
              showCover={true}
              maxShadowOpacity={0.5}
            >
              {Array.from({ length: numPages }, (_, i) => (
                <div key={i} className="pdf-page">
                  {isPageVisible(i) ? (
                    <Page
                      pageNumber={i + 1}
                      width={
                        isIphoneSE
                          ? 372
                          : isIphoneXR
                          ? 410
                          : isIphone12Pro
                          ? 390
                          : isIphone14ProMax
                          ? 430
                          : isGalaxyS8
                          ? 350
                          : isGalaxyS20
                          ? 412
                          : isIpadMini
                          ? 600
                          : 550
                      }
                      height={
                        isIphoneSE
                          ? 600
                          : isIphoneXR
                          ? 600
                          : isIphone12Pro
                          ? 600
                          : isIphone14ProMax
                          ? 600
                          : isGalaxyS8
                          ? 550
                          : isGalaxyS20
                          ? 600
                          : isIpadMini
                          ? 800
                          : 700
                      }
                      renderAnnotationLayer={false}
                      renderTextLayer={false}
                    />
                  ) : (
                    <div className="flex justify-center items-center w-full">
                      Loading...
                    </div>
                  )}
                </div>
              ))}
            </HTMLFlipBook>
          )}
        </Document>
      </div>
    </section>
  );
};

export default Book;
