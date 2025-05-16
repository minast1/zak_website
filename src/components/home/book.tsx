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
// // eslint-disable-next-line react/display-name

const Book = () => {
  const [pageWidth, setPageWidth] = React.useState(400);
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
  const initialPosition = "md:px-auto";
  const [position, setPosition] = React.useState(initialPosition);

  return (
    <section
      className={clsx(" w-screen bg-black", position)}
      ref={containerRef}
    >
      <div className="w-full">
        <Document
          file={`/issue_01.pdf`}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        >
          {numPages && (
            <HTMLFlipBook
              // width={isMobile ? 400 : 500}
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
                  setPosition(initialPosition);
                } else {
                  setPosition("md:pl-44");
                }
              }}
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
