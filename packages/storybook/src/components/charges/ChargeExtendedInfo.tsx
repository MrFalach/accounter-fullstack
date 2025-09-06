import React, { ReactElement } from 'react';
import { ChargeData, mockChargesData } from '../../mocks/charges-data';

export interface ChargeExtendedInfoProps {
  chargeID: string;
  onChange?: () => void;
  fetching: boolean;
}

export const ChargeExtendedInfo = ({
  chargeID,
  onChange = () => {},
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
    <div className="flex flex-col gap-5 p-6 bg-white rounded-lg shadow-lg max-w-6xl">
      {/* Header Section */}
      <div className="flex justify-between items-start border-b pb-4">
        <div className="flex-1">
          <div className="text-sm text-gray-500 mb-1">{charge.__typename}</div>
          <div className="flex items-center gap-4 mb-2">
            <span className="text-lg font-semibold">{charge.date}</span>
            <span className="text-lg font-semibold text-red-600">{charge.amount}</span>
            <span className="text-lg font-semibold">{charge.vat}</span>
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
        <div className="border rounded-lg">
          <div className="bg-gray-50 px-4 py-3 border-b">
            <h3 className="font-semibold text-gray-900">Transactions</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
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
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Generate multiple transaction rows based on the count */}
                {Array.from({ length: charge.moreInfo.transactions }, (_, index) => (
                  <tr key={`txn-${index}`}>
                    <td className="px-4 py-3 text-sm text-gray-900">{charge.counterparty}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{charge.date}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{charge.date}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{charge.amount}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {index === 0 ? 'Main Account' : `Sub Account ${index + 1}`}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {index === 0
                        ? charge.description
                        : `${charge.description} - Part ${index + 1}`}
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
            </table>
          </div>
        </div>

        {/* Documents Table */}
        <div className="border rounded-lg">
          <div className="bg-gray-50 px-4 py-3 border-b">
            <h3 className="font-semibold text-gray-900">Documents</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
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
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Generate multiple document rows based on the count */}
                {Array.from({ length: charge.moreInfo.documents }, (_, index) => {
                  const documentTypes = ['Invoice', 'Receipt', 'Credit Note', 'Debit Note'];
                  const documentType = documentTypes[index % documentTypes.length];
                  return (
                    <tr key={`doc-${index}`}>
                      <td className="px-4 py-3 text-sm text-gray-900">{charge.date}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{charge.amount}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{charge.vat}</td>
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
                        {index === 0
                          ? charge.description
                          : `${charge.description} - ${documentType}`}
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
            </table>
          </div>
        </div>

        {/* Ledger Records Table */}
        <div className="border rounded-lg">
          <div className="bg-gray-50 px-4 py-3 border-b">
            <h3 className="font-semibold text-gray-900">Ledger Records</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
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
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Generate multiple ledger record rows based on the count */}
                {Array.from({ length: charge.moreInfo.ledgerRecords }, (_, index) => {
                  const accountTypes = [
                    'Expense Account',
                    'Accounts Payable',
                    'Bank Account',
                    'Credit Card Account',
                  ];
                  const debitAccount = accountTypes[index % accountTypes.length];
                  const creditAccount = accountTypes[(index + 1) % accountTypes.length];
                  const statuses = ['Validated', 'Pending', 'Reconciled'];
                  const status = statuses[index % statuses.length];
                  const statusColor =
                    status === 'Validated'
                      ? 'bg-green-100 text-green-800'
                      : status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800';

                  return (
                    <tr key={`ledger-${index}`}>
                      <td className="px-4 py-3 text-sm text-gray-900">{charge.date}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{charge.date}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{debitAccount}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{charge.amount}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{creditAccount}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{charge.amount}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {index === 0
                          ? charge.description
                          : `${charge.description} - Entry ${index + 1}`}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        REF-{charge.id}-{index + 1}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${statusColor}`}
                        >
                          {status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
