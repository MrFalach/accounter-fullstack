import { ReactElement, useMemo, useState } from 'react';
import { Calendar, DollarSign, Plus, Search, Tag, User } from 'lucide-react';
import { ChargeData } from '../../mocks/charges-data';
import { MondayChargeRow } from './MondayChargeRow';

// Filter options
const FILTER_OPTIONS = [
  { id: 'all', label: 'All Charges', icon: DollarSign },
  { id: 'approved', label: 'Approved', icon: Tag },
  { id: 'pending', label: 'Pending', icon: Calendar },
  { id: 'unapproved', label: 'Unapproved', icon: User },
] as const;

// Group by options
const GROUP_OPTIONS = [
  { id: 'none', label: 'No Grouping' },
  { id: 'date', label: 'By Date' },
  { id: 'type', label: 'By Type' },
  { id: 'status', label: 'By Status' },
  { id: 'counterparty', label: 'By Counterparty' },
] as const;

interface MondayChargesTableProps {
  data?: ChargeData[];
}

export const MondayChargesTable = ({ data = [] }: MondayChargesTableProps): ReactElement => {
  const [expandedChargeId, setExpandedChargeId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [groupBy, setGroupBy] = useState<string>('none');

  const handleToggle = (chargeId: string) => {
    setExpandedChargeId(expandedChargeId === chargeId ? null : chargeId);
  };

  // Filter and search data
  const filteredData = useMemo(() => {
    let filtered = data;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        charge =>
          charge.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          charge.counterparty.toLowerCase().includes(searchTerm.toLowerCase()) ||
          charge.taxCategory.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Apply status filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter(
        charge => charge.accountantApproval.toLowerCase() === activeFilter,
      );
    }

    return filtered;
  }, [data, searchTerm, activeFilter]);

  // Group data
  const groupedData = useMemo(() => {
    if (groupBy === 'none') {
      return { 'All Charges': filteredData };
    }

    return filteredData.reduce(
      (groups, charge) => {
        let key: string;

        switch (groupBy) {
          case 'date':
            key = new Date(charge.date).toLocaleDateString('en-US', {
              month: 'long',
              year: 'numeric',
            });
            break;
          case 'type':
            key = charge.__typename;
            break;
          case 'status':
            key = charge.accountantApproval;
            break;
          case 'counterparty':
            key = charge.counterparty;
            break;
          default:
            key = 'All Charges';
        }

        if (!groups[key]) groups[key] = [];
        groups[key].push(charge);
        return groups;
      },
      {} as Record<string, ChargeData[]>,
    );
  }, [filteredData, groupBy]);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const totalAmount = filteredData.reduce((sum, charge) => {
    const amount = parseFloat(charge.amount.replace(/[$,]/g, ''));
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0);
  const totalVAT = filteredData.reduce((sum, charge) => {
    const vat = parseFloat(charge.vat.replace(/[$,]/g, ''));
    return sum + (isNaN(vat) ? 0 : vat);
  }, 0);

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Charges</h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>{filteredData.length} charges</span>
              <span>•</span>
              <span>Total: {formatAmount(totalAmount)}</span>
              <span>•</span>
              <span>VAT: {formatAmount(totalVAT)}</span>
              <span>•</span>
              <span>
                {filteredData.reduce(
                  (sum, charge) =>
                    sum +
                    charge.moreInfo.transactions +
                    charge.moreInfo.documents +
                    charge.moreInfo.ledgerRecords,
                  0,
                )}{' '}
                workflow items
              </span>
            </div>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <Plus className="w-4 h-4" />
            Add Charge
          </button>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search charges..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2">
            {FILTER_OPTIONS.map(filter => {
              const Icon = filter.icon;
              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                    activeFilter === filter.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Group By */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-sm font-medium text-gray-700">Group by:</span>
          <div className="flex gap-2">
            {GROUP_OPTIONS.map(option => (
              <button
                key={option.id}
                onClick={() => setGroupBy(option.id)}
                className={`px-3 py-1 rounded-md text-sm transition-colors ${
                  groupBy === option.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Groups */}
      {Object.entries(groupedData).map(([groupName, charges]) => (
        <div key={groupName} className="mb-8">
          <div className="flex items-center gap-3 mb-4 sticky top-0 bg-gray-50 py-2 z-10">
            <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
            <h2 className="text-lg font-semibold text-gray-800">{groupName}</h2>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
              {charges.length}
            </span>
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-sm text-gray-500">
              {formatAmount(
                charges.reduce((sum, charge) => {
                  const amount = parseFloat(charge.amount.replace(/[$,]/g, ''));
                  return sum + (isNaN(amount) ? 0 : amount);
                }, 0),
              )}
            </span>
          </div>

          <div className="space-y-4">
            {charges.map(charge => (
              <div key={charge.id} className="relative">
                <MondayChargeRow
                  charge={charge}
                  isExpanded={expandedChargeId === charge.id}
                  onToggle={() => handleToggle(charge.id)}
                />

                {/* Expanded workflow indicator */}
                {expandedChargeId === charge.id && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 text-blue-700">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">
                        Showing complete workflow: {charge.moreInfo.transactions} transactions,{' '}
                        {charge.moreInfo.documents} documents, {charge.moreInfo.ledgerRecords}{' '}
                        ledger records
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Empty State */}
      {filteredData.length === 0 && (
        <div className="text-center py-12">
          <div className="flex flex-col items-center">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm || activeFilter !== 'all' ? 'No charges found' : 'No charges yet'}
            </h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || activeFilter !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Get started by adding your first charge'}
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
              <Plus className="w-4 h-4" />
              Add Charge
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
