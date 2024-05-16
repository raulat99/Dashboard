'use client'
import CircularJSON from 'circular-json';

import { ReactNode } from 'react';
import Link from 'next/link';
import { FaFileDownload } from 'react-icons/fa';
import { useSession } from 'next-auth/react';

export const downloadButtonClasses =
  'rounded-full p-2 text-gray-400 hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-white';

  interface DownloadButtonProps {
    dataDownload: any;
  }

export default function DownloadButton({ dataDownload }: DownloadButtonProps) {
  const { data: session } = useSession({ required: true });


  const downloadAttachmentFromUrl = (url: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    link.click();
  };

  const downloadAttachment = (dataDownload: string, fileName: string) => {
    const url = window.URL.createObjectURL(new Blob([dataDownload]));
    downloadAttachmentFromUrl(url, fileName);
  };

  const onExportDataClick = () => {
    downloadAttachment(
      dataDownload,
      `Data_${new Date().toISOString().substring(0, 10)}.json`
    );
  }; 
  // const onExportDataClick = () => {
  //   try {
  //     const dataString = CircularJSON.stringify(dataDownload);
  //     console.log(dataString);
  //   } catch (error) {
  //     console.error("Error serializing dataDownload:", error);
  //   }
  // };
  


  return (
    <button className={downloadButtonClasses} onClick={onExportDataClick}> 
              <FaFileDownload size={22} />
    </button>
  );
}
