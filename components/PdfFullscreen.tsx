import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Expand, Loader2 } from 'lucide-react';
import SimpleBar from 'simplebar-react';
import { useResizeDetector } from 'react-resize-detector';
import { Document, Page } from 'react-pdf';
import { useToast } from './ui/use-toast';

interface PdfFullscreenProps {
  url: string;
}

const PdfFullscreen = ({ url }: PdfFullscreenProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [numPages, setNumPages] = useState<number>(1);
  const { ref, width } = useResizeDetector();
  const { toast } = useToast();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => {
        if (!v) setIsOpen(v);
      }}
    >
      <DialogTrigger asChild onClick={() => setIsOpen(true)}>
        <Button aria-label="fullscreen" variant={'ghost'} className="gap-1.5">
          <Expand className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-7xl w-full">
        <SimpleBar
          autoHide={false}
          className={`max-h-[calc(100svh-10rem)] mt-6`}
        >
          <div ref={ref}>
            <Document
              loading={
                <div className="flex justify-center">
                  <Loader2 className="my-24 w-6 h-6 animate-spin" />
                </div>
              }
              onLoadSuccess={({ numPages }) => {
                setNumPages(numPages);
              }}
              onLoadError={(err) => {
                toast({
                  title: 'Error loading PDF',
                  description: "We couldn't load your PDF. Please try again",
                  variant: 'destructive',
                });
              }}
              className="max-h-full"
              file={url}
            >
              {new Array(numPages).fill(0).map((_, i) => (
                <Page
                  key={i}
                  width={width ? width : 1}
                  pageNumber={i + 1}
                  className="mx-auto"
                />
              ))}
            </Document>
          </div>
        </SimpleBar>
      </DialogContent>
    </Dialog>
  );
};

export default PdfFullscreen;
