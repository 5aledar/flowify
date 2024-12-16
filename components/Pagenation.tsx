import React from 'react';
import { Button } from './ui/button';

const Pagenation = ({
  currentPage,
  prevPage,
  nextPage,
  isLoading,
  meta,
}: any) => {
  return (
    <div className="flex items-center flex-row-reverse justify-between gap-7 mt-6">
      <div className="flex gap-2">
        <Button
          disabled={currentPage === 1}
          variant={'outline'}
          onClick={prevPage}
          className="h-[30px] text-[12px]  rounded-lg  disabled:cursor-not-allowed"
        >
          Previous
        </Button>
        <Button
          disabled={currentPage === meta?.totalPages || isLoading}
          variant={'outline'}
          onClick={nextPage}
          className=" text-[12px] h-[30px] rounded-lg  disabled:cursor-not-allowed"
        >
          Next
        </Button>
      </div>
      <span className="text-[12px] font-normal w-[100px]">
        Page {meta?.currentPage} of {meta?.totalPages}
      </span>
    </div>
  );
};

export default Pagenation;
