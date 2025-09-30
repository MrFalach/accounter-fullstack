import { Check } from 'lucide-react';
import { Button } from '../../../../../../client/src/components/ui/button';
import { DocumentsTableRowType } from '../types';

interface DebtorCellProps {
  document: DocumentsTableRowType;
}

export const DebtorCell = ({ document }: DebtorCellProps) => {
  const hasDebtor = document.debtor?.name;
  const hasSuggestion = 'missingInfoSuggestions' in document && document.missingInfoSuggestions;

  const handleAcceptSuggestion = () => {
    console.log('Accepting debtor suggestion for document:', document.id);
    document.onUpdate?.();
  };

  const handleNavigateToDebtor = () => {
    console.log('Navigating to debtor:', document.debtor?.name);
  };

  if (!hasDebtor && hasSuggestion) {
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

  if (!hasDebtor) {
    return (
      <div className="flex items-center gap-1">
        <div className="w-2 h-2 bg-red-500 rounded-full" />
        <span className="text-gray-400">Missing</span>
      </div>
    );
  }

  return (
    <button
      onClick={handleNavigateToDebtor}
      className="text-left hover:text-blue-600 hover:underline transition-colors"
    >
      {document.debtor.name}
    </button>
  );
};