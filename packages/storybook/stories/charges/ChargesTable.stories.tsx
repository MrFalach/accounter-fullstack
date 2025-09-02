import React, { ReactElement, useState } from 'react';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

// Mock the GraphQL fragments and types
const Currency = {
  Ils: 'ILS',
  Usd: 'USD',
  Eur: 'EUR',
} as const;

// Creative financial scenarios - realistic business charges
const mockChargesData = [
  {
    id: 'charge-1',
    __typename: 'Common',
    date: '2025-01-15',
    amount: '-$299.00',
    vat: '$0.00',
    counterparty: 'Microsoft Corporation',
    description: 'Office 365 Business Premium - Annual Subscription',
    tags: ['business', 'software'],
    taxCategory: 'Operational Tools',
    businessTrip: null,
    moreInfo: { transactions: 1, ledgerRecords: 2, documents: 1 },
    accountantApproval: 'APPROVED',
    hasExtendedInfo: true,
  },
  {
    id: 'charge-2',
    __typename: 'CreditCardBankCharge',
    date: '2025-01-14',
    amount: '-$1,250.00',
    vat: '$0.00',
    counterparty: 'Amazon Web Services',
    description: 'Cloud Infrastructure & Database Services',
    tags: ['business', 'cloud', 'tech'],
    taxCategory: 'R&D Tools',
    businessTrip: null,
    moreInfo: { transactions: 1, ledgerRecords: 3, documents: 2 },
    accountantApproval: 'PENDING',
    hasExtendedInfo: true,
  },
  {
    id: 'charge-3',
    __typename: 'Common',
    date: '2025-01-13',
    amount: '-₪2,800.00',
    vat: '₪476.00',
    counterparty: 'Deloitte Consulting',
    description: 'Strategic Business Advisory Services - Q1 2025',
    tags: ['business', 'consulting'],
    taxCategory: 'Professional Services',
    businessTrip: null,
    moreInfo: { transactions: 1, ledgerRecords: 2, documents: 3 },
    accountantApproval: 'APPROVED',
    hasExtendedInfo: true,
  },
  {
    id: 'charge-4',
    __typename: 'BusinessTripCharge',
    date: '2025-01-12',
    amount: '-$850.00',
    vat: '$0.00',
    counterparty: 'Marriott International',
    description: 'Business Trip - Tech Conference San Francisco',
    tags: ['business', 'travel', 'conference'],
    taxCategory: 'Travel Expenses',
    businessTrip: 'TechCrunch Disrupt 2025',
    moreInfo: { transactions: 2, ledgerRecords: 4, documents: 2 },
    accountantApproval: 'APPROVED',
    hasExtendedInfo: true,
  },
  {
    id: 'charge-5',
    __typename: 'CreditCardBankCharge',
    date: '2025-01-11',
    amount: '-₪450.00',
    vat: '₪76.50',
    counterparty: 'Stripe Payments',
    description: 'Payment Processing Fees - December 2024',
    tags: ['business', 'financial', 'payments'],
    taxCategory: 'Financial Services',
    businessTrip: null,
    moreInfo: { transactions: 1, ledgerRecords: 1, documents: 1 },
    accountantApproval: 'UNAPPROVED',
    hasExtendedInfo: false,
  },
];

// Mock the ChargeExtendedInfo component (reusing our existing story)
const ChargeExtendedInfo = ({
  chargeID,
  onChange = () => {},
  fetching = false,
}: {
  chargeID: string;
  onChange?: () => void;
  fetching: boolean;
}): ReactElement => {
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
          <div className="text-sm text-gray-500 mb-1">Common</div>
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

// Enhanced charge row with expandable functionality
const ChargeRow = ({
  charge,
  isExpanded,
  onToggle,
}: {
  charge: (typeof mockChargesData)[0];
  isExpanded: boolean;
  onToggle: () => void;
}): ReactElement => (
  <>
    <tr
      className={`hover:bg-gray-50 cursor-pointer transition-colors ${
        isExpanded ? 'bg-blue-50' : ''
      }`}
      onClick={() => charge.hasExtendedInfo && onToggle()}
    >
      <td className="px-6 py-4 text-sm text-gray-900">
        <div className="flex items-center">
          <span className="text-lg mr-2">
            {charge.__typename === 'Common'
              ? '💼'
              : charge.__typename === 'CreditCardBankCharge'
                ? '💳'
                : charge.__typename === 'BusinessTripCharge'
                  ? '✈️'
                  : '📊'}
          </span>
          <span className="text-sm font-medium text-gray-900">{charge.__typename}</span>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-gray-900">{charge.date}</td>
      <td className="px-6 py-4 text-sm text-red-600 font-medium">{charge.amount}</td>
      <td className="px-6 py-4 text-sm text-gray-900">{charge.vat}</td>
      <td className="px-6 py-4 text-sm text-gray-900">{charge.counterparty}</td>
      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{charge.description}</td>
      <td className="px-6 py-4 text-sm text-gray-900">
        <div className="flex gap-1">
          {charge.tags.slice(0, 2).map(tag => (
            <span key={tag} className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded-full">
              {tag}
            </span>
          ))}
          {charge.tags.length > 2 && (
            <span className="px-2 py-1 text-xs bg-gray-300 text-gray-600 rounded-full">
              +{charge.tags.length - 2}
            </span>
          )}
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-gray-900">{charge.taxCategory}</td>
      <td className="px-6 py-4 text-sm text-gray-900">{charge.businessTrip || '-'}</td>
      <td className="px-6 py-4 text-sm text-gray-600">
        <div className="text-center">
          <div>Transactions: {charge.moreInfo.transactions}</div>
          <div>Ledger Records: {charge.moreInfo.ledgerRecords}</div>
          <div>Documents: {charge.moreInfo.documents}</div>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-gray-900">
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            charge.accountantApproval === 'APPROVED'
              ? 'bg-green-100 text-green-800'
              : charge.accountantApproval === 'PENDING'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
          }`}
        >
          {charge.accountantApproval}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-900">
        <button className="text-blue-600 hover:text-blue-900" onClick={e => e.stopPropagation()}>
          ✏️
        </button>
      </td>
      <td className="px-6 py-4 text-sm text-gray-900">
        <div className="flex gap-2">
          <button className="text-gray-600 hover:text-gray-900" onClick={e => e.stopPropagation()}>
            ⋮
          </button>
          <button className="text-gray-600 hover:text-gray-900" onClick={e => e.stopPropagation()}>
            📁
          </button>
          {charge.hasExtendedInfo && (
            <button
              className={`text-blue-600 hover:text-blue-900 transition-transform ${
                isExpanded ? 'rotate-180' : ''
              }`}
              onClick={e => {
                e.stopPropagation();
                onToggle();
              }}
            >
              ▼
            </button>
          )}
        </div>
      </td>
    </tr>
    {isExpanded && charge.hasExtendedInfo && (
      <tr>
        <td colSpan={13} className="px-6 py-4 bg-gray-50">
          <ChargeExtendedInfo chargeID={charge.id} onChange={() => {}} fetching={false} />
        </td>
      </tr>
    )}
  </>
);

// Mock the ChargesTable component with expandable functionality
const ChargesTable = ({
  data = mockChargesData,
  isAllOpened = false,
}: {
  data?: typeof mockChargesData;
  isAllOpened?: boolean;
}): ReactElement => {
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

const meta = {
  title: 'Components/Charges/ChargesTable',
  component: ChargesTable,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A comprehensive charges table that displays financial charges with expandable rows showing detailed information. Each row can be clicked to reveal transaction details, documents, and ledger records in a drawer-like interface.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      description: 'Array of charge records to display',
      control: 'object',
    },
    isAllOpened: {
      description: 'Whether all charges should be expanded by default',
      control: 'boolean',
    },
  },
} satisfies Meta<typeof ChargesTable>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story with all charges collapsed
export const Default: Story = {
  args: {
    data: mockChargesData,
    isAllOpened: false,
  },
};

// Story with minimal data
export const MinimalData: Story = {
  args: {
    data: mockChargesData.slice(0, 2),
    isAllOpened: false,
  },
};

// Story with different charge types
export const MixedChargeTypes: Story = {
  args: {
    data: mockChargesData.filter(charge =>
      ['Common', 'CreditCardBankCharge', 'BusinessTripCharge'].includes(charge.__typename),
    ),
    isAllOpened: false,
  },
};

// Story showing business trip charges
export const WithBusinessTrip: Story = {
  args: {
    data: mockChargesData.filter(charge => charge.__typename === 'BusinessTripCharge'),
    isAllOpened: false,
  },
};
