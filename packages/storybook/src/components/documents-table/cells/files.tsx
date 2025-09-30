import { FileText, Image } from 'lucide-react';
import { Button } from '../../../../../../client/src/components/ui/button';
import { DocumentsTableRowType } from '../types';

interface FilesCellProps {
  document: DocumentsTableRowType;
}

export const FilesCell = ({ document }: FilesCellProps) => {
  const hasImage = document.image;
  const hasFile = document.file;

  const handleViewImage = () => {
    console.log('Viewing image for document:', document.id);
  };

  const handleDownloadFile = () => {
    console.log('Downloading file for document:', document.id);
  };

  if (!hasImage && !hasFile) {
    return (
      <div className="flex items-center gap-1">
        <div className="w-2 h-2 bg-red-500 rounded-full" />
        <span className="text-gray-400 text-sm">No files</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1">
      {hasImage && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleViewImage}
          className="h-6 w-6 text-blue-600 hover:text-blue-800"
        >
          <Image className="h-3 w-3" />
        </Button>
      )}
      {hasFile && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDownloadFile}
          className="h-6 w-6 text-green-600 hover:text-green-800"
        >
          <FileText className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
};