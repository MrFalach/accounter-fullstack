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
}

export const ChargesTable = ({ data = [] }: ChargesTableProps): ReactElement => {
  const [expandedChargeId, setExpandedChargeId] = useState<string | null>(null);

  const handleToggle = (chargeId: string) => {
    setExpandedChargeId(expandedChargeId === chargeId ? null : chargeId);
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
                isExpanded={expandedChargeId === charge.id}
                onToggle={() => handleToggle(charge.id)}
              />
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};
