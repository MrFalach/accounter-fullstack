import { ReactElement } from 'react';
import { ChargeData } from '../../mocks/charges-data';
import { ChargeExtendedInfo } from './ChargeExtendedInfo';

// Constants for charge type icons and approval status colors
const CHARGE_TYPE_ICONS = {
  Common: '💼',
  CreditCardBankCharge: '💳',
  BusinessTripCharge: '✈️',
  ConversionCharge: '📊',
} as const;

const APPROVAL_STATUS_COLORS = {
  APPROVED: 'bg-green-100 text-green-800',
  PENDING: 'bg-yellow-100 text-yellow-800',
  UNAPPROVED: 'bg-red-100 text-red-800',
} as const;

// Approval badge component
const ApprovalBadge = ({ status }: { status: string }) => (
  <span
    className={`px-2 py-1 text-xs font-medium rounded-full ${
      APPROVAL_STATUS_COLORS[status as keyof typeof APPROVAL_STATUS_COLORS] ||
      APPROVAL_STATUS_COLORS.UNAPPROVED
    }`}
  >
    {status}
  </span>
);

// Charge type icon component
const ChargeTypeIcon = ({ type }: { type: string }) => (
  <span className="text-lg mr-2">
    {CHARGE_TYPE_ICONS[type as keyof typeof CHARGE_TYPE_ICONS] || '📊'}
  </span>
);

// Tags display component
const TagsDisplay = ({ tags }: { tags: string[] }) => (
  <div className="flex gap-1">
    {tags.slice(0, 2).map(tag => (
      <span key={tag} className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded-full">
        {tag}
      </span>
    ))}
    {tags.length > 2 && (
      <span className="px-2 py-1 text-xs bg-gray-300 text-gray-600 rounded-full">
        +{tags.length - 2}
      </span>
    )}
  </div>
);

// Action buttons component
const ActionButtons = ({
  isExpanded,
  hasExtendedInfo,
  onToggle,
}: {
  isExpanded: boolean;
  hasExtendedInfo: boolean;
  onToggle: () => void;
}) => (
  <div className="flex gap-2">
    <button className="text-gray-600 hover:text-gray-900" onClick={e => e.stopPropagation()}>
      ⋮
    </button>
    <button className="text-gray-600 hover:text-gray-900" onClick={e => e.stopPropagation()}>
      📁
    </button>
    {hasExtendedInfo && (
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
);

export interface ChargeRowProps {
  charge: ChargeData;
  isExpanded: boolean;
  onToggle: () => void;
}

export const ChargeRow = ({ charge, isExpanded, onToggle }: ChargeRowProps): ReactElement => {
  const handleClick = () => {
    if (charge.hasExtendedInfo) {
      onToggle();
    }
  };

  return (
    <>
      <tr
        className={`hover:bg-gray-50 cursor-pointer transition-colors ${
          isExpanded ? 'bg-blue-50' : ''
        }`}
        onClick={handleClick}
      >
        <td className="px-6 py-4 text-sm text-gray-900">
          <div className="flex items-center">
            <ChargeTypeIcon type={charge.__typename} />
            <span className="text-sm font-medium text-gray-900">{charge.__typename}</span>
          </div>
        </td>
        <td className="px-6 py-4 text-sm text-gray-900">{charge.date}</td>
        <td className="px-6 py-4 text-sm text-red-600 font-medium">{charge.amount}</td>
        <td className="px-6 py-4 text-sm text-gray-900">{charge.vat}</td>
        <td className="px-6 py-4 text-sm text-gray-900">{charge.counterparty}</td>
        <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{charge.description}</td>
        <td className="px-6 py-4 text-sm text-gray-900">
          <TagsDisplay tags={charge.tags} />
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
          <ApprovalBadge status={charge.accountantApproval} />
        </td>
        <td className="px-6 py-4 text-sm text-gray-900">
          <button className="text-blue-600 hover:text-blue-900" onClick={e => e.stopPropagation()}>
            ✏️
          </button>
        </td>
        <td className="px-6 py-4 text-sm text-gray-900">
          <ActionButtons
            isExpanded={isExpanded}
            hasExtendedInfo={charge.hasExtendedInfo}
            onToggle={onToggle}
          />
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
};
