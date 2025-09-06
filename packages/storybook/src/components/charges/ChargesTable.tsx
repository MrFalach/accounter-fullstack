import React, { ReactElement, useState } from 'react';
import { ChargeData } from '../../mocks/charges-data';
import { ChargeRow } from './ChargeRow';

export interface ChargesTableProps {
  data?: ChargeData[];
  isAllOpened?: boolean;
}

export const ChargesTable = ({
  data = [],
  isAllOpened = false,
}: ChargesTableProps): ReactElement => {
  const [expandedChargeId, setExpandedChargeId] = useState<string | null>(null);

  const handleToggle = (chargeId: string) => {
    setExpandedChargeId(expandedChargeId === chargeId ? null : chargeId);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              VAT
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Counterparty
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tags
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tax Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Business Trip
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              More Info
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Accountant Approval
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Edit
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              More Info
            </th>
          </tr>
        </thead>
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
      </table>
    </div>
  );
};
