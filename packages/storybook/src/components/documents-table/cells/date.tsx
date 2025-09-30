import { DocumentsTableRowType } from '../types';

interface DateCellProps {
  document: DocumentsTableRowType;
}

export const DateCell = ({ document }: DateCellProps) => {
  const hasDate = document.date;

  if (!hasDate) {
    return (
      <div className="flex items-center gap-1">
        <div className="w-2 h-2 bg-red-500 rounded-full" />
        <span className="text-gray-400">Missing</span>
      </div>
    );
  }

  const formattedDate = new Date(document.date).toLocaleDateString();

  return <span className="text-gray-700">{formattedDate}</span>;
};