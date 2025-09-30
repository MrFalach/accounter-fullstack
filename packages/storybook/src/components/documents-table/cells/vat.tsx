import { DocumentsTableRowType } from '../types';

interface VatCellProps {
  document: DocumentsTableRowType;
}

export const VatCell = ({ document }: VatCellProps) => {
  const hasVat = document.vat?.formatted;

  if (!hasVat) {
    return (
      <div className="flex items-center gap-1">
        <div className="w-2 h-2 bg-red-500 rounded-full" />
        <span className="text-gray-400">Missing</span>
      </div>
    );
  }

  return (
    <span className="text-gray-700 font-medium">
      {document.vat.formatted}
    </span>
  );
};