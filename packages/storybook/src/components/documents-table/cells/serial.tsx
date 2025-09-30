import { DocumentsTableRowType } from '../types';

interface SerialCellProps {
  document: DocumentsTableRowType;
}

export const SerialCell = ({ document }: SerialCellProps) => {
  const hasSerial = document.serialNumber;

  if (!hasSerial) {
    return (
      <div className="flex items-center gap-1">
        <div className="w-2 h-2 bg-red-500 rounded-full" />
        <span className="text-gray-400">Missing</span>
      </div>
    );
  }

  return <span className="text-gray-700">{document.serialNumber}</span>;
};