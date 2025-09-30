import { useState, useMemo } from 'react';
import { Edit2, X } from 'lucide-react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { Button } from '../../../../client/src/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../../client/src/components/ui/table';
import { SortableHeader } from '../shared/SortableHeader';
import {
  AmountCell,
  CreditorCell,
  DateCell,
  DebtorCell,
  FilesCell,
  SerialCell,
  TypeCell,
  VatCell,
} from './cells';
import { DocumentsTableProps, DocumentsTableRowType } from './types';

// Create columns definition
const createColumns = (): ColumnDef<DocumentsTableRowType>[] => [
  {
    accessorKey: 'date',
    sortingFn: (rowA, rowB) => {
      const dateA =
        'date' in rowA.original && rowA.original.date ? new Date(rowA.original.date).getTime() : 0;
      const dateB =
        'date' in rowB.original && rowB.original.date ? new Date(rowB.original.date).getTime() : 0;
      return dateA - dateB;
    },
    header: ({ column }) => <SortableHeader title="Date" column={column} />,
    cell: ({ row }) => <DateCell document={row.original} />,
  },
  {
    accessorKey: 'amount.raw',
    header: ({ column }) => <SortableHeader title="Amount" column={column} />,
    cell: ({ row }) => <AmountCell document={row.original} />,
  },
  {
    accessorKey: 'vat.raw',
    header: ({ column }) => <SortableHeader title="VAT" column={column} />,
    cell: ({ row }) => <VatCell document={row.original} />,
  },
  {
    accessorKey: 'documentType',
    header: ({ column }) => <SortableHeader title="Type" column={column} />,
    cell: ({ row }) => <TypeCell document={row.original} />,
  },
  {
    accessorKey: 'serialNumber',
    header: ({ column }) => <SortableHeader title="Serial" column={column} />,
    cell: ({ row }) => <SerialCell document={row.original} />,
  },
  {
    accessorKey: 'creditor.name',
    header: ({ column }) => <SortableHeader title="Creditor" column={column} />,
    cell: ({ row }) => <CreditorCell document={row.original} />,
  },
  {
    accessorKey: 'debtor.name',
    header: ({ column }) => <SortableHeader title="Debtor" column={column} />,
    cell: ({ row }) => <DebtorCell document={row.original} />,
  },
  {
    accessorKey: 'file',
    header: ({ column }) => <SortableHeader title="Files" column={column} />,
    cell: ({ row }) => <FilesCell document={row.original} />,
  },
  {
    accessorKey: 'id',
    header: 'Edit',
    cell: ({ row }) => {
      return (
        <Button variant="ghost" size="icon" onClick={row.original.editDocument} className="h-8 w-8">
          <Edit2 className="h-4 w-4" />
        </Button>
      );
    },
  },
];

export const DocumentsTable: React.FC<DocumentsTableProps> = ({ data, onChange }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [editDocumentId, setEditDocumentId] = useState<string | undefined>(undefined);

  // Add editDocument function to each row (memoized to prevent re-render loops)
  const dataWithActions = useMemo(() =>
    data.map(document => ({
      ...document,
      editDocument: () => setEditDocumentId(document.id),
      onUpdate: onChange || (() => {}),
    })),
    [data, onChange]
  );

  const columns = createColumns();

  const table = useReactTable({
    data: dataWithActions,
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
              <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
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
                No documents found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Basic Modal Container - Step 2 */}
      {editDocumentId && (
        <div className="fixed inset-0 z-50 bg-black/20">
          <div className="fixed bottom-0 left-0 right-0 max-h-[80vh] bg-white shadow-lg outline outline-2 outline-indigo-300 overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h1 className="text-xl font-semibold text-gray-900">Edit Document</h1>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setEditDocumentId(undefined)}
                className="h-6 w-6"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-6 space-y-4">
              <div className="text-sm text-gray-500 mb-4">Document ID: {editDocumentId}</div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Document Type
                  </label>
                  <select className="w-full p-2 border border-gray-300 rounded-md">
                    <option>Invoice</option>
                    <option>Receipt</option>
                    <option>Credit Invoice</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Serial Number
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter serial number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="0.00"
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    VAT
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="0.00"
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Currency
                  </label>
                  <select className="w-full p-2 border border-gray-300 rounded-md">
                    <option>ILS</option>
                    <option>USD</option>
                    <option>EUR</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => setEditDocumentId(undefined)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    // Mock save functionality
                    console.log('Saving document:', editDocumentId);
                    onChange?.();
                    setEditDocumentId(undefined);
                  }}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
