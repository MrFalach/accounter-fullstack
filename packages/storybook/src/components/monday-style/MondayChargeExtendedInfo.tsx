import { ReactElement } from 'react';
import { CheckCircle, FileText, TrendingUp } from 'lucide-react';
import {
  MondayAccountCell,
  MondayAmountCell,
  MondayBusinessCell,
  MondayDateCell,
  MondayDescriptionCell,
  MondayReferenceCell,
  MondaySerialCell,
  MondayStatusCell,
  MondayTypeCell,
} from './MondayCells';
import { MondayTable } from './MondayTable';

// Mock data generators
const generateTransactions = (count: number) => {
  const counterparties = [
    'Acme Corp',
    'Tech Solutions',
    'Global Services',
    'Innovation Inc',
    'Future Systems',
  ];
  const accounts = [
    { name: 'Business Account', type: 'Bank Account' },
    { name: 'Credit Card', type: 'Credit Card' },
    { name: 'Cash Account', type: 'Cash' },
  ];
  const descriptions = [
    'Office supplies purchase',
    'Software subscription',
    'Travel expenses',
    'Marketing campaign',
    'Equipment maintenance',
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `txn-${i + 1}`,
    counterparty: { id: `cp-${i + 1}`, name: counterparties[i % counterparties.length] },
    eventDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    effectiveDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    amount: {
      raw: Math.random() * 2000 - 1000,
      formatted: `$${(Math.random() * 2000 - 1000).toFixed(2)}`,
    },
    account: accounts[i % accounts.length],
    sourceDescription: descriptions[i % descriptions.length],
    referenceKey: `REF-${Math.floor(Math.random() * 10000)}`,
  }));
};

const generateDocuments = (count: number) => {
  const types = ['Invoice', 'Receipt', 'Credit Note', 'Debit Note'];
  const creditors = ['Supplier A', 'Vendor B', 'Service Provider C', 'Contractor D'];
  const debtors = ['Our Company', 'Client X', 'Partner Y'];

  return Array.from({ length: count }, (_, i) => ({
    id: `doc-${i + 1}`,
    date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    amount: { raw: Math.random() * 1500, formatted: `$${(Math.random() * 1500).toFixed(2)}` },
    vat: { raw: Math.random() * 300, formatted: `$${(Math.random() * 300).toFixed(2)}` },
    documentType: types[i % types.length],
    serialNumber: `SN-${Math.floor(Math.random() * 10000)}`,
    creditor: { id: `cr-${i + 1}`, name: creditors[i % creditors.length] },
    debtor: { id: `dr-${i + 1}`, name: debtors[i % debtors.length] },
    file: `document-${i + 1}.pdf`,
    image: `image-${i + 1}.jpg`,
  }));
};

const generateLedgerRecords = (count: number) => {
  const statuses = ['Validated', 'Pending', 'Reconciled'];
  const accounts = [
    { id: 'acc-1', name: 'Accounts Payable' },
    { id: 'acc-2', name: 'Office Expenses' },
    { id: 'acc-3', name: 'Travel Expenses' },
    { id: 'acc-4', name: 'Software Expenses' },
  ];
  const descriptions = [
    'Monthly office rent payment',
    'Software license renewal',
    'Business travel expenses',
    'Marketing campaign costs',
    'Equipment purchase',
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `ledger-${i + 1}`,
    invoiceDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    valueDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    debitAccount1: accounts[i % accounts.length],
    creditAccount1: accounts[(i + 1) % accounts.length],
    debitAmount1: { raw: Math.random() * 1000, formatted: `$${(Math.random() * 1000).toFixed(2)}` },
    creditAmount1: {
      raw: Math.random() * 1000,
      formatted: `$${(Math.random() * 1000).toFixed(2)}`,
    },
    localCurrencyDebitAmount1: {
      raw: Math.random() * 1000,
      formatted: `$${(Math.random() * 1000).toFixed(2)}`,
    },
    localCurrencyCreditAmount1: {
      raw: Math.random() * 1000,
      formatted: `$${(Math.random() * 1000).toFixed(2)}`,
    },
    description: descriptions[i % descriptions.length],
    reference: `REF-${Math.floor(Math.random() * 10000)}`,
    matchingStatus: statuses[i % statuses.length] as 'Validated' | 'Pending' | 'Reconciled',
  }));
};

interface MondayChargeExtendedInfoProps {
  transactionsCount: number;
  documentsCount: number;
  ledgerRecordsCount: number;
}

export const MondayChargeExtendedInfo = ({
  transactionsCount,
  documentsCount,
  ledgerRecordsCount,
}: MondayChargeExtendedInfoProps): ReactElement => {
  const transactions = generateTransactions(transactionsCount);
  const documents = generateDocuments(documentsCount);
  const ledgerRecords = generateLedgerRecords(ledgerRecordsCount);

  return (
    <div className="space-y-6">
      {/* Transactions Table */}
      <div className="bg-gradient-to-r from-blue-50/30 to-indigo-50/30 rounded-xl p-4 border border-blue-100/50">
        <MondayTable
          title="Transactions"
          count={transactionsCount}
          icon={<TrendingUp className="w-5 h-5 text-blue-600" />}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Counterparty
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Amount
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Account
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Description
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Reference
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(transaction => (
                  <tr
                    key={transaction.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <MondayBusinessCell business={transaction.counterparty} />
                    </td>
                    <td className="py-3 px-4">
                      <MondayDateCell date={transaction.eventDate} />
                    </td>
                    <td className="py-3 px-4">
                      <MondayAmountCell amount={transaction.amount.raw} />
                    </td>
                    <td className="py-3 px-4">
                      <MondayAccountCell account={transaction.account} />
                    </td>
                    <td className="py-3 px-4">
                      <MondayDescriptionCell description={transaction.sourceDescription} />
                    </td>
                    <td className="py-3 px-4">
                      <MondayReferenceCell reference={transaction.referenceKey} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </MondayTable>
      </div>

      {/* Documents Table */}
      <div className="bg-gradient-to-r from-emerald-50/30 to-teal-50/30 rounded-xl p-4 border border-emerald-100/50">
        <MondayTable
          title="Documents"
          count={documentsCount}
          icon={<FileText className="w-5 h-5 text-emerald-600" />}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Amount
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">VAT</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Serial
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Creditor
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Debtor
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Files</th>
                </tr>
              </thead>
              <tbody>
                {documents.map(document => (
                  <tr
                    key={document.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <MondayDateCell date={document.date} />
                    </td>
                    <td className="py-3 px-4">
                      <MondayAmountCell amount={document.amount.raw} />
                    </td>
                    <td className="py-3 px-4">
                      <MondayAmountCell amount={document.vat.raw} />
                    </td>
                    <td className="py-3 px-4">
                      <MondayTypeCell type={document.documentType} />
                    </td>
                    <td className="py-3 px-4">
                      <MondaySerialCell serial={document.serialNumber} />
                    </td>
                    <td className="py-3 px-4">
                      <MondayBusinessCell business={document.creditor} />
                    </td>
                    <td className="py-3 px-4">
                      <MondayBusinessCell business={document.debtor} />
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm text-gray-500">
                        {document.file} • {document.image}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </MondayTable>
      </div>

      {/* Ledger Records Table */}
      <div className="bg-gradient-to-r from-amber-50/30 to-orange-50/30 rounded-xl p-4 border border-amber-100/50">
        <MondayTable
          title="Ledger Records"
          count={ledgerRecordsCount}
          icon={<CheckCircle className="w-5 h-5 text-amber-600" />}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Invoice Date
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Value Date
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Debit Account
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Debit Amount
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Credit Account
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Credit Amount
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Description
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Reference
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {ledgerRecords.map(record => (
                  <tr
                    key={record.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <MondayDateCell date={record.invoiceDate} />
                    </td>
                    <td className="py-3 px-4">
                      <MondayDateCell date={record.valueDate} />
                    </td>
                    <td className="py-3 px-4">
                      <MondayAccountCell account={record.debitAccount1} />
                    </td>
                    <td className="py-3 px-4">
                      <MondayAmountCell amount={record.debitAmount1.raw} />
                    </td>
                    <td className="py-3 px-4">
                      <MondayAccountCell account={record.creditAccount1} />
                    </td>
                    <td className="py-3 px-4">
                      <MondayAmountCell amount={record.creditAmount1.raw} />
                    </td>
                    <td className="py-3 px-4">
                      <MondayDescriptionCell description={record.description} />
                    </td>
                    <td className="py-3 px-4">
                      <MondayReferenceCell reference={record.reference} />
                    </td>
                    <td className="py-3 px-4">
                      <MondayStatusCell status={record.matchingStatus} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </MondayTable>
      </div>
    </div>
  );
};
