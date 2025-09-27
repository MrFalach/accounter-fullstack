import { ReactElement, ReactNode } from 'react';
import { mockChargesData } from '../../mocks/charges-data';
import { FormattedAmount } from '../common/FormattedAmount';

// Constants for mock data generation
const DOCUMENT_TYPES = ['Invoice', 'Receipt', 'Credit Note', 'Debit Note'] as const;
const ACCOUNT_TYPES = [
  'Expense Account',
  'Accounts Payable',
  'Bank Account',
  'Credit Card Account',
] as const;
const STATUSES = ['Validated', 'Pending', 'Reconciled'] as const;

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Validated':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Reconciled':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(status)}`}>
      {status}
    </span>
  );
};

// Table component
const Table = ({ title, header, body }: { title: string; header: ReactNode; body: ReactNode }) => (
  <div className="border rounded-lg">
    <div className="bg-gray-50 px-4 py-3 border-b">
      <h3 className="font-semibold text-gray-900">{title}</h3>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">{header}</thead>
        {body}
      </table>
    </div>
  </div>
);

export interface ChargeExtendedInfoProps {
  chargeID: string;
  onChange?: () => void;
  fetching: boolean;
}

export const ChargeExtendedInfo = ({
  chargeID,
  onChange: _onChange = () => {},
  fetching = false,
}: ChargeExtendedInfoProps): ReactElement => {
  if (fetching) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Find the charge data for this ID
  const charge = mockChargesData.find(c => c.id === chargeID);

  if (!charge) {
    return <div className="p-4 text-gray-500">Charge not found</div>;
  }

  return (
    <div className="flex flex-col gap-5 p-6 bg-white rounded-lg shadow-lg w-full">
      {/* Header Section */}
      <div className="flex justify-between items-start border-b pb-4">
        <div className="flex-1">
          <div className="text-sm text-gray-500 mb-1">{charge.__typename}</div>
          <div className="flex items-center gap-4 mb-2">
            <span className="text-lg font-semibold">{charge.date}</span>
            <span className="text-lg font-semibold">
              <FormattedAmount amount={charge.amount} />
            </span>
            <span className="text-lg font-semibold">
              <FormattedAmount amount={charge.vat} showSign={false} />
            </span>
            <span className="text-lg font-semibold">{charge.counterparty}</span>
          </div>
          <div className="text-lg font-medium text-gray-800">{charge.description}</div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="flex gap-2">
            {charge.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
          <div className="text-right text-sm text-gray-600">
            <div>Transactions: {charge.moreInfo.transactions}</div>
            <div>Ledger Records: {charge.moreInfo.ledgerRecords}</div>
            <div>Documents: {charge.moreInfo.documents}</div>
          </div>
        </div>
      </div>

      {/* Tables Section */}
      <div className="space-y-6">
        {/* Transactions Table */}
        <Table
          title="Transactions"
          header={
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Counterparty
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Event Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Debit Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Account
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reference#
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Edit
              </th>
            </tr>
          }
          body={
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Generate multiple transaction rows based on the count */}
              {Array.from({ length: charge.moreInfo.transactions }, (_, index) => (
                <tr key={`txn-${index}`}>
                  <td className="px-4 py-3 text-sm text-gray-900">{charge.counterparty}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{charge.date}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{charge.date}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    <FormattedAmount amount={charge.amount} />
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {index === 0 ? 'Main Account' : `Sub Account ${index + 1}`}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {index === 0 ? charge.description : `${charge.description} - Part ${index + 1}`}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    REF-{charge.id}-{index + 1}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    <button className="text-blue-600 hover:text-blue-800">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          }
        />

        {/* Documents Table */}
        <Table
          title="Documents"
          header={
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                VAT
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Serial
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Creditor
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Debtor
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Files
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Edit
              </th>
            </tr>
          }
          body={
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Generate multiple document rows based on the count */}
              {Array.from({ length: charge.moreInfo.documents }, (_, index) => {
                const documentType = DOCUMENT_TYPES[index % DOCUMENT_TYPES.length];
                return (
                  <tr key={`doc-${index}`}>
                    <td className="px-4 py-3 text-sm text-gray-900">{charge.date}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      <FormattedAmount amount={charge.amount} />
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      <FormattedAmount amount={charge.vat} showSign={false} />
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">{documentType}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {documentType === 'Invoice'
                        ? 'INV'
                        : documentType === 'Receipt'
                          ? 'REC'
                          : 'DOC'}
                      -{charge.id}-{index + 1}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {index === 0 ? charge.description : `${charge.description} - ${documentType}`}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">{charge.counterparty}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">Our Company Ltd.</td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      <button className="text-gray-600 hover:text-gray-800">📄</button>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      <button className="text-blue-600 hover:text-blue-800">Edit</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          }
        />

        {/* Ledger Records Table */}
        <Table
          title="Ledger Records"
          header={
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Invoice Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Value Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Debit Account1
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Credit Account1
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Details
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reference
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          }
          body={
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Generate multiple ledger record rows based on the count */}
              {Array.from({ length: charge.moreInfo.ledgerRecords }, (_, index) => {
                const debitAccount = ACCOUNT_TYPES[index % ACCOUNT_TYPES.length];
                const creditAccount = ACCOUNT_TYPES[(index + 1) % ACCOUNT_TYPES.length];
                const status = STATUSES[index % STATUSES.length];

                return (
                  <tr key={`ledger-${index}`}>
                    <td className="px-4 py-3 text-sm text-gray-900">{charge.date}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{charge.date}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{debitAccount}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      <FormattedAmount amount={charge.amount} />
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">{creditAccount}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      <FormattedAmount amount={charge.amount} />
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {index === 0
                        ? charge.description
                        : `${charge.description} - Entry ${index + 1}`}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      REF-{charge.id}-{index + 1}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      <StatusBadge status={status} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          }
        />
      </div>
    </div>
  );
};
