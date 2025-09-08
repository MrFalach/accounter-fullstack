import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@accounter/client/src/components/ui/table';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { EmptyState } from '../shared/EmptyState';
import { createColumns } from './columns';
import { LedgerRecordRow, LedgerTableProps, MatchingStatus } from './types';

// Status color constants
const STATUS_COLORS = {
  New: 'bg-green-100/30',
  Deleted: 'bg-red-100/30',
  Diff: 'bg-yellow-100/30',
} as const;

function getRowColorByStatus(status?: MatchingStatus): string {
  return status ? STATUS_COLORS[status] || '' : '';
}

export const LedgerTable: React.FC<LedgerTableProps> = ({ data, onAccountClick }) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = createColumns({ onAccountClick });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map(row => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                className={getRowColorByStatus(row.original.matchingStatus)}
              >
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <EmptyState
              icon="📊"
              title="No ledger records found"
              description="There are no ledger records to display at the moment."
              colSpan={columns.length}
            />
          )}
        </TableBody>
      </Table>
    </div>
  );
};
