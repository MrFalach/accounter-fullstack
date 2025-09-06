import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../ui/Button';

interface SortableHeaderProps {
  title: string;
  column: any;
}

export const SortableHeader = ({ title, column }: SortableHeaderProps) => (
  <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
    {title}
    {column.getIsSorted() &&
      (column.getIsSorted() === 'asc' ? (
        <ChevronUp className="ml-2 h-4 w-4" />
      ) : (
        <ChevronDown className="ml-2 h-4 w-4" />
      ))}
  </Button>
);
