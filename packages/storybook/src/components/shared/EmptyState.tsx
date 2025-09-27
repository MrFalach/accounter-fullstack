import { ReactElement } from 'react';

interface EmptyStateProps {
  icon?: string | ReactElement;
  title: string;
  description: string;
  colSpan: number;
}

export const EmptyState = ({ icon = '📊', title, description, colSpan }: EmptyStateProps) => (
  <tr>
    <td colSpan={colSpan} className="h-24 text-center">
      <div className="flex flex-col items-center">
        <div className="mb-2">{icon}</div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>
        <p className="text-gray-500">{description}</p>
      </div>
    </td>
  </tr>
);
