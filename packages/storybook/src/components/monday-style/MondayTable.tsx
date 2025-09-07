import { ReactElement, ReactNode } from 'react';

interface MondayTableProps {
  title: string;
  count: number;
  children: ReactNode;
  icon?: ReactNode;
}

export const MondayTable = ({ title, count, children, icon }: MondayTableProps): ReactElement => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 rounded-t-xl">
        <div className="flex items-center gap-3">
          {icon && <div className="text-blue-600">{icon}</div>}
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
            {count}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">{children}</div>
    </div>
  );
};
