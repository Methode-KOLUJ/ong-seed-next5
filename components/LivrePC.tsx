'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { pdfjs, Document as PdfDocument, Page as PdfPage } from 'react-pdf';
import type { DocumentProps } from 'react-pdf';

const HTMLFlipBook = dynamic(() => import('react-pageflip'), { ssr: false });

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Livre = '/HISTOIRE.pdf';

const LivrePC: React.FC = () => {
  const [numPages, setNumPages] = useState<number>(0);
  const isClient = typeof window !== 'undefined';

  const onDocumentLoadSuccess: DocumentProps['onLoadSuccess'] = ({ numPages }) => {
    setNumPages(numPages || 0);
  };

  if (!isClient) return null;

  const width = window.innerWidth < 768 ? 300 : 400;
  const height = window.innerWidth < 768 ? 420 : 560;

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center overflow-hidden">
      <PdfDocument file={Livre} onLoadSuccess={onDocumentLoadSuccess}>
        {numPages > 0 ? (
          <div className="relative" style={{ width, height, overflow: 'hidden' }}>
            <HTMLFlipBook
              width={width}
              height={height}
              showCover={true}
              className="shadow-md"
            >
              {[...Array(numPages)].map((_, index) => (
                <div
                  key={index}
                  className="bg-[#fdf6e3] h-full w-full rounded shadow-inner overflow-hidden"
                >
                  <PdfPage
                    pageNumber={index + 1}
                    width={width}
                    renderAnnotationLayer={false}
                    renderTextLayer={false}
                  />
                </div>
              ))}
            </HTMLFlipBook>
          </div>
        ) : (
          <p className="text-lg">Chargement du livre...</p>
        )}
      </PdfDocument>
    </div>
  );
};

export default LivrePC;
