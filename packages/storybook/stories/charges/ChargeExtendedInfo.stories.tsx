import { ReactElement } from 'react';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

// Mock the GraphQL fragments and types
const Currency = {
  Ils: 'ILS',
  Usd: 'USD',
  Eur: 'EUR',
} as const;

// Mock the charge data structure based on the image
const mockChargeData = {
  __typename: 'FinancialCharge' as const,
  id: '6ae4ea4f-75f0-4ba0-875c-a6bb8e569a7d',
  metadata: {
    transactionsCount: 1,
    documentsCount: 2,
    ledgerCount: 3,
    isLedgerLocked: false,
  },
  // Mock transactions data (1 transaction)
  transactions: [
    {
      id: 'txn-1',
      counterparty: 'Vercel Inc.',
      eventDate: '2025-08-18',
      debitDate: '2025-08-20',
      amount: '-$106.67',
      account: 'CREDIT_CARD 5972',
      description: 'VERCEL INC/COVINA',
      reference: '302986',
    },
  ],
  // Mock documents data (2 documents)
  documents: [
    {
      id: 'doc-1',
      date: '2025-08-18',
      amount: '$106.67',
      vat: '$0.00',
      type: 'Tax Invoice',
      serial: '17742F81-0137',
      description: 'Vercel Hosting Services',
      creditor: 'Vercel Inc.',
      debtor: 'Software Products Guilda Ltd.',
    },
    {
      id: 'doc-2',
      date: '2025-08-18',
      amount: '$106.67',
      vat: '$0.00',
      type: 'Receipt',
      serial: '17742F81-0137',
      description: 'Vercel Hosting Services',
      creditor: 'Vercel Inc.',
      debtor: 'Software Products Guilda Ltd.',
    },
  ],
  // Mock ledger records data (3 records)
  ledgerRecords: [
    {
      id: 'ledger-1',
      invoiceDate: '2025-08-20',
      valueDate: '2025-08-20',
      debitAccount1: 'R&D Tools',
      amount1: '₪1.07',
      creditAccount1: 'Vercel Inc.',
      amount2: '₪1.07',
      details: 'Exchange ledger record',
      reference: '',
      status: 'Validated',
    },
    {
      id: 'ledger-2',
      invoiceDate: '2025-08-18',
      valueDate: '2025-08-20',
      debitAccount1: 'Vercel Inc.',
      amount1: '$106.67 ₪362.68',
      creditAccount1: 'Credit Card 5972 USD',
      amount2: '$106.67 ₪362.68',
      details: 'VERCEL INC/COVINA',
      reference: '6ae4ea4f-75f0-4ba0-875c-a6bb8e569a7d',
      status: 'Validated',
    },
    {
      id: 'ledger-3',
      invoiceDate: '2025-08-18',
      valueDate: '2025-08-18',
      debitAccount1: 'R&D Tools',
      amount1: '$106.67 ₪361.61',
      creditAccount1: 'Vercel Inc.',
      amount2: '$106.67 ₪361.61',
      details: 'Vercel Hosting Services',
      reference: '17742F81-0137',
      status: 'Validated',
    },
  ],
  miscExpenses: [],
  businessTrip: null,
};

// Mock the ChargeExtendedInfo component
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

  return (
    <div className="flex flex-col gap-5 p-6 bg-white rounded-lg shadow-lg max-w-6xl">
      {/* Header Section */}
      <div className="flex justify-between items-start border-b pb-4">
        <div className="flex-1">
          <div className="text-sm text-gray-500 mb-1">Common</div>
          <div className="flex items-center gap-4 mb-2">
            <span className="text-lg font-semibold">20/08/25</span>
            <span className="text-lg font-semibold text-red-600">$-106.67</span>
            <span className="text-lg font-semibold">$0.00</span>
            <span className="text-lg font-semibold">Vercel Inc.</span>
          </div>
          <div className="text-lg font-medium text-gray-800">Vercel Hosting</div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">
              business
            </span>
            <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">
              R&D Tools
            </span>
          </div>
          <div className="text-right text-sm text-gray-600">
            <div>Transactions: 1</div>
            <div>Ledger Records: 3</div>
            <div>Documents: 2</div>
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
                {mockChargeData.transactions.map(txn => (
                  <tr key={txn.id}>
                    <td className="px-4 py-3 text-sm text-gray-900">{txn.counterparty}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{txn.eventDate}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{txn.debitDate}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{txn.amount}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{txn.account}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{txn.description}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{txn.reference}</td>
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
                {mockChargeData.documents.map(doc => (
                  <tr key={doc.id}>
                    <td className="px-4 py-3 text-sm text-gray-900">{doc.date}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{doc.amount}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{doc.vat}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{doc.type}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{doc.serial}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{doc.description}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{doc.creditor}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{doc.debtor}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      <button className="text-gray-600 hover:text-gray-800">📄</button>
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
                {mockChargeData.ledgerRecords.map(record => (
                  <tr key={record.id}>
                    <td className="px-4 py-3 text-sm text-gray-900">{record.invoiceDate}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{record.valueDate}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{record.debitAccount1}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{record.amount1}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{record.creditAccount1}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{record.amount2}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{record.details}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{record.reference}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const meta = {
  title: 'Components/Charges/ChargeExtendedInfo',
  component: ChargeExtendedInfo,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A comprehensive charge details component that displays transaction information, documents, and ledger records in an organized drawer-like interface. Shows detailed breakdown of financial charges with supporting documentation.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    chargeID: {
      description: 'Unique identifier for the charge',
      control: 'text',
    },
    onChange: {
      description: 'Callback when charge data is updated',
      action: 'charge-updated',
    },
    fetching: {
      description: 'Loading state for the component',
      control: 'boolean',
    },
  },
} satisfies Meta<typeof ChargeExtendedInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

// Full charge with all data (matching the image)
export const FullCharge: Story = {
  args: {
    chargeID: '6ae4ea4f-75f0-4ba0-875c-a6bb8e569a7d',
    onChange: action('charge-updated'),
    fetching: false,
  },
};

// Loading state
export const Loading: Story = {
  args: {
    chargeID: '6ae4ea4f-75f0-4ba0-875c-a6bb8e569a7d',
    onChange: action('charge-updated'),
    fetching: true,
  },
};

// Minimal charge with basic info
export const MinimalCharge: Story = {
  args: {
    chargeID: 'minimal-charge-123',
    onChange: action('charge-updated'),
    fetching: false,
  },
};

// Different charge ID
export const DifferentCharge: Story = {
  args: {
    chargeID: 'different-charge-456',
    onChange: action('charge-updated'),
    fetching: false,
  },
};
