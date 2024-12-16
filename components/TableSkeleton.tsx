import React from 'react';
import { TableBody, TableRow, TableCell } from './ui/table';
import { Skeleton } from './ui/skeleton';
const TableSkeleton = () => {
  return (
    <TableBody>
      <TableRow>
        <TableCell>
          <Skeleton className="w-[70px] h-[20px]" />
        </TableCell>
        <TableCell>
          <Skeleton className="w-[165px] h-[20px]" />
        </TableCell>
        <TableCell>
          <Skeleton className="w-[150px] h-[20px]" />
        </TableCell>
        <TableCell className="flex justify-end">
          <Skeleton className="w-[50px] h-[35px] " />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <Skeleton className="w-[70px] h-[20px]" />
        </TableCell>
        <TableCell>
          <Skeleton className="w-[165px] h-[20px]" />
        </TableCell>
        <TableCell>
          <Skeleton className="w-[150px] h-[20px]" />
        </TableCell>
        <TableCell className="flex justify-end">
          <Skeleton className="w-[50px] h-[35px] " />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <Skeleton className="w-[70px] h-[20px]" />
        </TableCell>
        <TableCell>
          <Skeleton className="w-[165px] h-[20px]" />
        </TableCell>
        <TableCell>
          <Skeleton className="w-[150px] h-[20px]" />
        </TableCell>
        <TableCell className="flex justify-end">
          <Skeleton className="w-[50px] h-[35px] " />
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default TableSkeleton;
