import { Check } from 'lucide-react';
import { Button } from '../../../../../../client/src/components/ui/button';
import { DocumentsTableRowType } from '../types';

interface AmountCellProps {
  document: DocumentsTableRowType;
}

export const AmountCell = ({ document }: AmountCellProps) => {
  const hasAmount = document.amount?.formatted;
  const hasSuggestion = 'missingInfoSuggestions' in document && document.missingInfoSuggestions;

  const handleAcceptSuggestion = () => {
    console.log('Accepting amount suggestion for document:', document.id);
    document.onUpdate?.();
  };

  if (!hasAmount && hasSuggestion) {
    return (
      <div className="flex items-center gap-2 bg-yellow-50 p-1 rounded">
        <span className="text-sm text-gray-600">Suggestion available</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleAcceptSuggestion}
          className="h-6 w-6 text-green-600 hover:text-green-800"
        >
          <Check className="h-3 w-3" />
        </Button>
      </div>
    );
  }

  if (!hasAmount) {
    return (
      <div className="flex items-center gap-1">
        <div className="w-2 h-2 bg-red-500 rounded-full" />
        <span className="text-gray-400">Missing</span>
      </div>
    );
  }

  const isNegative = document.amount?.raw && document.amount.raw < 0;

  return (
    <span className={`font-medium ${isNegative ? 'text-red-600' : 'text-green-600'}`}>
      {document.amount.formatted}
    </span>
  );
};