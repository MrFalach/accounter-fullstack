import { ReactElement, useState } from 'react';
import { ChargeData } from '../../mocks/charges-data';
import { EmptyState } from '../shared/EmptyState';
import { ChargeRow } from './ChargeRow';

// Table headers configuration
const TABLE_HEADERS = [
  'Type',
  'Date',
  'Amount',
  'VAT',
  'Counterparty',
  'Description',
  'Tags',
  'Tax Category',
  'Business Trip',
  'More Info',
  'Accountant Approval',
  'Edit',
  'Actions',
] as const;

export interface ChargesTableProps {
  data?: ChargeData[];
  defaultView?: 'collapsed' | 'expanded';
  oneAtATime?: boolean;
  activeId?: string | null;
  onActiveIdChange?: (id: string | null) => void;
}

export const ChargesTable = ({
  data = [],
  defaultView = 'collapsed',
  oneAtATime = true,
  activeId,
  onActiveIdChange,
}: ChargesTableProps): ReactElement => {
  const [internalActiveId, setInternalActiveId] = useState<string | null>(
    defaultView === 'expanded' && data.length > 0 ? data[0].id : null,
  );

  const isControlled = activeId !== undefined && typeof onActiveIdChange === 'function';
  const currentActiveId = isControlled ? (activeId as string | null) : internalActiveId;

  const handleToggle = (chargeId: string) => {
    if (isControlled && onActiveIdChange) {
      const next = currentActiveId === chargeId ? null : chargeId;
      onActiveIdChange(next);
      return;
    }

    setInternalActiveId(prev => (prev === chargeId ? null : chargeId));
  };

  const renderTableHeaders = () => (
    <thead className="bg-gray-50">
      <tr>
        {TABLE_HEADERS.map(header => (
          <th
            key={header}
            className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
              header === 'Tags' ? 'px-3' : ''
            }`}
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );

  const renderEmptyState = () => (
    <tbody>
      <EmptyState
        icon="📊"
        title="No charges found"
        description="There are no charges to display at the moment."
        colSpan={TABLE_HEADERS.length}
      />
    </tbody>
  );

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        {renderTableHeaders()}
        {data.length === 0 ? (
          renderEmptyState()
        ) : (
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map(charge => (
              <ChargeRow
                key={charge.id}
                charge={charge}
                isExpanded={currentActiveId === charge.id}
                onToggle={() => handleToggle(charge.id)}
              />
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};
