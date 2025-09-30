import { ReactElement, useState } from 'react';
import { Copy, Trash2, Unlink, X } from 'lucide-react';
import { Button } from '../../../../../client/src/components/ui/button';

interface Props {
  documentId?: string;
  onDone: () => void;
  onChange: () => void;
}

// Mock PopUpDrawer component using custom implementation
const PopUpDrawer = ({
  children,
  position = 'bottom',
  title,
  opened = false,
  onClose,
}: {
  children: React.ReactNode;
  position?: 'left' | 'right' | 'top' | 'bottom';
  title?: ReactElement;
  opened?: boolean;
  onClose?: () => void;
}) => {
  if (!opened) return null;

  const positionClasses = {
    bottom: 'bottom-0 left-0 right-0 max-h-[80vh]',
    top: 'top-0 left-0 right-0 max-h-[80vh]',
    left: 'left-0 top-0 bottom-0 max-w-[80vw]',
    right: 'right-0 top-0 bottom-0 max-w-[80vw]',
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/20">
      <div
        className={`fixed bg-white shadow-lg outline outline-2 outline-indigo-300 overflow-y-auto ${positionClasses[position]}`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          {title}
          <Button variant="ghost" size="icon" onClick={onClose} className="h-6 w-6">
            <X className="h-4 w-4" />
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
};

// Mock Tooltip component
const Tooltip = ({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) => {
  return (
    <div className="group relative">
      {children}
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
        {label}
      </div>
    </div>
  );
};

// Mock EditDocument component
const EditDocument = ({
  documentId,
  onDone,
  onChange,
}: {
  documentId: string;
  onDone: () => void;
  onChange: () => void;
}) => {
  const handleSave = () => {
    // Mock save functionality
    onChange();
    onDone();
  };

  return (
    <div className="p-6 space-y-4">
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

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={onDone}>
          Cancel
        </Button>
        <Button onClick={handleSave}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export const EditDocumentModal = ({ onDone, onChange, documentId }: Props): ReactElement | null => {
  if (!documentId) return null;

  const handleCopyId = () => {
    navigator.clipboard.writeText(documentId);
  };

  const handleUnlink = () => {
    // Mock unlink functionality
    console.log('Unlinking document:', documentId);
    onChange();
  };

  const handleDelete = () => {
    // Mock delete functionality
    if (confirm('Are you sure you want to delete this document?')) {
      console.log('Deleting document:', documentId);
      onChange();
      onDone();
    }
  };

  return (
    <PopUpDrawer
      modalSize="fit-content"
      position="bottom"
      opened={!!documentId}
      onClose={onDone}
      title={
        <div className="flex flex-row mx-3 pt-3 sm:text-1xl gap-5">
          <h1 className="sm:text-2xl font-small text-gray-900">Edit Document</h1>
          <div className="flex flex-row gap-2 items-center">
            <span className="text-sm text-gray-600">ID: {documentId}</span>
            <Tooltip label="Copy ID">
              <Button variant="ghost" size="icon" onClick={handleCopyId} className="h-6 w-6">
                <Copy className="h-3 w-3" />
              </Button>
            </Tooltip>
            <Tooltip label="Unlink Document">
              <Button variant="ghost" size="icon" onClick={handleUnlink} className="h-6 w-6">
                <Unlink className="h-3 w-3" />
              </Button>
            </Tooltip>
            <Tooltip label="Delete Document">
              <Button variant="ghost" size="icon" onClick={handleDelete} className="h-6 w-6 text-red-600 hover:text-red-800">
                <Trash2 className="h-3 w-3" />
              </Button>
            </Tooltip>
          </div>
        </div>
      }
    >
      <EditDocument documentId={documentId} onDone={onDone} onChange={onChange} />
    </PopUpDrawer>
  );
};