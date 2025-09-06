import React, { ReactElement } from 'react';
import { ChargeData } from '../../mocks/charges-data';
import { ChargeExtendedInfo } from './ChargeExtendedInfo';

export interface ChargeRowProps {
  charge: ChargeData;
  isExpanded: boolean;
  onToggle: () => void;
}

export const ChargeRow = ({ charge, isExpanded, onToggle }: ChargeRowProps): ReactElement => (
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
