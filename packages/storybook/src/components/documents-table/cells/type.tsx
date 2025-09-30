import { DocumentsTableRowType, DocumentType } from '../types';

interface TypeCellProps {
  document: DocumentsTableRowType;
}

const getTypeColor = (type: DocumentType) => {
  switch (type) {
    case DocumentType.Invoice:
      return 'bg-blue-100 text-blue-800';
    case DocumentType.Receipt:
      return 'bg-green-100 text-green-800';
    case DocumentType.CreditInvoice:
      return 'bg-red-100 text-red-800';
    case DocumentType.Unprocessed:
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const TypeCell = ({ document }: TypeCellProps) => {
  const typeColor = getTypeColor(document.documentType);

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${typeColor}`}>
      {document.documentType}
    </span>
  );
};