import { ReactElement, useMemo, useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table.js';

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: string;
  category: string;
  account: string;
  status: 'pending' | 'completed' | 'failed';
}

export interface TransactionsTableProps {
  transactions: Transaction[];
  enableEdit?: boolean;
  enableChargeLink?: boolean;
  onChange?: () => void;
}

const columns = [
  {
    accessorKey: 'date',
    header: 'Date',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }: any) => {
      const amount = row.getValue('amount') as number;
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);
      return <div className={amount >= 0 ? 'text-green-600' : 'text-red-600'}>{formatted}</div>;
    },
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'account',
    header: 'Account',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }: any) => {
      const status = row.getValue('status') as string;
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            status === 'completed'
              ? 'bg-green-100 text-green-800'
              : status === 'pending'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
          }`}
        >
          {status}
        </span>
      );
    },
  },
];

export const TransactionsTable = ({
  transactions,
  onChange = (): void => void 0,
  enableEdit,
  enableChargeLink,
}: TransactionsTableProps): ReactElement => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const data = useMemo(
    () =>
      transactions?.map(transaction => ({
        ...transaction,
        enableEdit,
        enableChargeLink,
      })),
    [transactions, enableEdit, enableChargeLink],
  );

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
              <TableRow key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
