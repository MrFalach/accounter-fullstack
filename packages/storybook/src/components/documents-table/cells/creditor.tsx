import { Check } from 'lucide-react';
import { Button } from '../../../../../../client/src/components/ui/button';
import { DocumentsTableRowType } from '../types';

interface CreditorCellProps {
  document: DocumentsTableRowType;
}

export const CreditorCell = ({ document }: CreditorCellProps) => {
  const hasCreditor = document.creditor?.name;
  const hasSuggestion = 'missingInfoSuggestions' in document && document.missingInfoSuggestions;

  const handleAcceptSuggestion = () => {
    console.log('Accepting creditor suggestion for document:', document.id);
    document.onUpdate?.();
  };

  const handleNavigateToCreditor = () => {
    console.log('Navigating to creditor:', document.creditor?.name);
  };

  if (!hasCreditor && hasSuggestion) {
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

  if (!hasCreditor) {
    return (
      <div className="flex items-center gap-1">
        <div className="w-2 h-2 bg-red-500 rounded-full" />
        <span className="text-gray-400">Missing</span>
      </div>
    );
  }

  return (
    <button
      onClick={handleNavigateToCreditor}
      className="text-left hover:text-blue-600 hover:underline transition-colors"
    >
      {document.creditor.name}
    </button>
  );
};