import { ReactElement } from 'react';
import {
  Building2,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  FileText,
  Hash,
  User,
  XCircle,
} from 'lucide-react';

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'Validated':
        return { icon: CheckCircle, color: 'bg-green-100 text-green-800 border-green-200' };
      case 'Pending':
        return { icon: Clock, color: 'bg-yellow-100 text-yellow-800 border-yellow-200' };
      case 'Reconciled':
        return { icon: CheckCircle, color: 'bg-blue-100 text-blue-800 border-blue-200' };
      default:
        return { icon: XCircle, color: 'bg-gray-100 text-gray-800 border-gray-200' };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <span
      className={`px-3 py-1 text-xs font-medium rounded-full border flex items-center gap-1 w-fit ${config.color}`}
    >
      <Icon className="w-3 h-3" />
      {status}
    </span>
  );
};

// Date cell component
export const MondayDateCell = ({ date }: { date: string }): ReactElement => (
  <div className="flex items-center gap-2">
    <Calendar className="w-4 h-4 text-gray-400" />
    <span className="text-sm font-medium text-gray-900">
      {new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })}
    </span>
  </div>
);

// Amount cell component
export const MondayAmountCell = ({
  amount,
  currency = 'USD',
}: {
  amount: number;
  currency?: string;
}): ReactElement => (
  <div className="flex items-center gap-2">
    <DollarSign className="w-4 h-4 text-gray-400" />
    <span className={`text-sm font-medium ${amount >= 0 ? 'text-green-600' : 'text-red-500'}`}>
      {new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
      }).format(amount)}
    </span>
  </div>
);

// Type cell component
export const MondayTypeCell = ({ type }: { type: string }): ReactElement => (
  <div className="flex items-center gap-2">
    <FileText className="w-4 h-4 text-gray-400" />
    <span className="text-sm font-medium text-gray-900">{type}</span>
  </div>
);

// Serial cell component
export const MondaySerialCell = ({ serial }: { serial: string }): ReactElement => (
  <div className="flex items-center gap-2">
    <Hash className="w-4 h-4 text-gray-400" />
    <span className="text-sm font-mono text-gray-900">{serial}</span>
  </div>
);

// Business cell component
export const MondayBusinessCell = ({
  business,
}: {
  business: { id: string; name: string };
}): ReactElement => (
  <div className="flex items-center gap-2">
    <User className="w-4 h-4 text-gray-400" />
    <button className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline">
      {business.name}
    </button>
  </div>
);

// Account cell component
export const MondayAccountCell = ({
  account,
}: {
  account: { name: string; type: string };
}): ReactElement => (
  <div className="flex items-center gap-2">
    <Building2 className="w-4 h-4 text-gray-400" />
    <div>
      <div className="text-xs text-gray-500 uppercase tracking-wide">{account.type}</div>
      <div className="text-sm font-medium text-gray-900">{account.name}</div>
    </div>
  </div>
);

// Status cell component
export const MondayStatusCell = ({ status }: { status: string }): ReactElement => (
  <StatusBadge status={status} />
);

// Description cell component
export const MondayDescriptionCell = ({ description }: { description: string }): ReactElement => (
  <div className="text-sm text-gray-900 max-w-xs truncate" title={description}>
    {description}
  </div>
);

// Reference cell component
export const MondayReferenceCell = ({ reference }: { reference: string }): ReactElement => (
  <div className="flex items-center gap-2">
    <Hash className="w-4 h-4 text-gray-400" />
    <span className="text-sm font-mono text-gray-600">{reference}</span>
  </div>
);
