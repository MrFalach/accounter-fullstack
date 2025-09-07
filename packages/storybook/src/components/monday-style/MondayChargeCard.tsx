import { ReactElement } from 'react';
import {
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  FileText,
  Tag,
  TrendingUp,
  User,
  XCircle,
} from 'lucide-react';
import { ChargeData } from '../../mocks/charges-data';
import { MondayWorkflowTables } from './MondayWorkflowTables';

// Status configuration
const STATUS_CONFIG = {
  APPROVED: {
    icon: CheckCircle,
    color: 'text-green-600 bg-green-50 border-green-200',
    label: 'Approved',
  },
  PENDING: {
    icon: Clock,
    color: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    label: 'Pending',
  },
  UNAPPROVED: {
    icon: XCircle,
    color: 'text-red-600 bg-red-50 border-red-200',
    label: 'Unapproved',
  },
} as const;

// Charge type configuration
const CHARGE_TYPE_CONFIG = {
  Common: { icon: FileText, color: 'bg-blue-100 text-blue-600' },
  CreditCardBankCharge: { icon: DollarSign, color: 'bg-purple-100 text-purple-600' },
  BusinessTripCharge: { icon: TrendingUp, color: 'bg-orange-100 text-orange-600' },
  ConversionCharge: { icon: Tag, color: 'bg-green-100 text-green-600' },
} as const;

interface MondayChargeCardProps {
  charge: ChargeData;
  isExpanded: boolean;
  onToggle: () => void;
}

export const MondayChargeCard = ({
  charge,
  isExpanded,
  onToggle,
}: MondayChargeCardProps): ReactElement => {
  const statusConfig =
    STATUS_CONFIG[charge.accountantApproval as keyof typeof STATUS_CONFIG] ||
    STATUS_CONFIG.UNAPPROVED;
  const typeConfig =
    CHARGE_TYPE_CONFIG[charge.type as keyof typeof CHARGE_TYPE_CONFIG] || CHARGE_TYPE_CONFIG.Common;
  const StatusIcon = statusConfig.icon;
  const TypeIcon = typeConfig.icon;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div
      className={`group bg-white rounded-xl border shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200 p-6 mb-4 cursor-pointer ${
        isExpanded ? 'border-blue-300 shadow-md bg-blue-50/30' : 'border-gray-200'
      }`}
      onClick={onToggle}
    >
      {/* Header Row */}
      <div className="flex items-start justify-between mb-4">
        {/* Left Section - Type and Basic Info */}
        <div className="flex items-start gap-4 flex-1">
          {/* Type Icon */}
          <div className={`p-3 rounded-lg ${typeConfig.color}`}>
            <TypeIcon className="w-5 h-5" />
          </div>

          {/* Main Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold text-gray-900 truncate">{charge.description}</h3>
              <div
                className={`px-3 py-1 rounded-full text-xs font-medium border ${statusConfig.color}`}
              >
                <StatusIcon className="w-3 h-3 inline mr-1" />
                {statusConfig.label}
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(charge.date)}</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>{charge.counterparty}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Amount and Actions */}
        <div className="text-right">
          <div
            className={`text-2xl font-bold ${charge.amount >= 0 ? 'text-green-600' : 'text-red-500'}`}
          >
            {formatAmount(charge.amount)}
          </div>
          {charge.vat > 0 && (
            <div className="text-sm text-gray-500 mt-1">VAT: {formatAmount(charge.vat)}</div>
          )}
        </div>
      </div>

      {/* Content Row */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
        {/* Tax Category */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Tax Category
            </div>
            <div className="text-sm font-medium text-gray-900">{charge.taxCategory}</div>
          </div>
        </div>

        {/* Business Trip */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
          <div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Business Trip
            </div>
            <div className="text-sm font-medium text-gray-900">
              {charge.businessTrip ? 'Yes' : 'No'}
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Tags</div>
            <div className="flex gap-1 flex-wrap">
              {charge.tags.slice(0, 2).map(tag => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
                >
                  {tag}
                </span>
              ))}
              {charge.tags.length > 2 && (
                <span className="px-2 py-1 text-xs bg-gray-200 text-gray-600 rounded-full">
                  +{charge.tags.length - 2}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* More Info */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
          <div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Workflow
            </div>
            <div className="text-sm font-medium text-gray-900">
              {charge.moreInfo.transactions +
                charge.moreInfo.documents +
                charge.moreInfo.ledgerRecords}{' '}
              items
            </div>
            <div className="text-xs text-gray-500">
              {charge.moreInfo.transactions}T • {charge.moreInfo.documents}D •{' '}
              {charge.moreInfo.ledgerRecords}L
            </div>
            <div className="text-xs text-blue-600 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
              Click to {isExpanded ? 'collapse' : 'expand'} workflow
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Section - Full Workflow */}
      {isExpanded && (
        <div className="border-t border-gray-100 pt-6 mt-6">
          {/* Workflow Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-1">Complete Workflow</h4>
                <p className="text-sm text-gray-600">
                  Detailed view of all transactions, documents, and ledger records for this charge.
                </p>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span className="text-gray-700">{charge.moreInfo.transactions} Transactions</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700">{charge.moreInfo.documents} Documents</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-600" />
                  <span className="text-gray-700">
                    {charge.moreInfo.ledgerRecords} Ledger Records
                  </span>
                </div>
              </div>
            </div>

            {/* Workflow Summary Bar */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {charge.moreInfo.transactions}
                    </div>
                    <div className="text-xs text-gray-600 uppercase tracking-wide">
                      Transactions
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {charge.moreInfo.documents}
                    </div>
                    <div className="text-xs text-gray-600 uppercase tracking-wide">Documents</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {charge.moreInfo.ledgerRecords}
                    </div>
                    <div className="text-xs text-gray-600 uppercase tracking-wide">
                      Ledger Records
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Total Items</div>
                  <div className="text-xl font-bold text-gray-900">
                    {charge.moreInfo.transactions +
                      charge.moreInfo.documents +
                      charge.moreInfo.ledgerRecords}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Workflow Tables */}
          <MondayWorkflowTables
            transactionsCount={charge.moreInfo.transactions}
            documentsCount={charge.moreInfo.documents}
            ledgerRecordsCount={charge.moreInfo.ledgerRecords}
          />
        </div>
      )}

      {/* Action Bar */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-4">
        <div className="flex gap-2">
          <button
            className="text-gray-400 hover:text-gray-600 transition-colors"
            onClick={e => e.stopPropagation()}
          >
            <FileText className="w-4 h-4" />
          </button>
          <button
            className="text-gray-400 hover:text-gray-600 transition-colors"
            onClick={e => e.stopPropagation()}
          >
            <Tag className="w-4 h-4" />
          </button>
        </div>

        <div className="flex gap-2">
          <button
            className="text-gray-400 hover:text-gray-600 transition-colors"
            onClick={e => e.stopPropagation()}
          >
            <User className="w-4 h-4" />
          </button>
          <button
            onClick={e => {
              e.stopPropagation(); // Prevent card click when button is clicked
              onToggle();
            }}
            className={`relative text-blue-600 hover:text-blue-800 transition-all ${
              isExpanded ? 'rotate-180' : ''
            }`}
            title={`${isExpanded ? 'Hide' : 'Show'} complete workflow`}
          >
            <TrendingUp className="w-4 h-4" />
            {/* Workflow indicator dot */}
            {charge.moreInfo.transactions +
              charge.moreInfo.documents +
              charge.moreInfo.ledgerRecords >
              0 && (
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full border border-white"></div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
