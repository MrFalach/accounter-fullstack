import { ReactElement } from 'react';

interface FormattedAmountProps {
  amount: string | number;
  className?: string;
  showSign?: boolean;
}

export const FormattedAmount = ({
  amount,
  className = '',
  showSign = true,
}: FormattedAmountProps): ReactElement => {
  // Convert string amount to number for processing
  const parseAmount = (amountStr: string | number): number => {
    if (typeof amountStr === 'number') return amountStr;

    // Remove currency symbols and parse, preserving the sign
    const cleanAmount = amountStr.replace(/[₪$€£¥,]/g, '');
    const parsed = parseFloat(cleanAmount);
    return isNaN(parsed) ? 0 : parsed;
  };

  const numericAmount = parseAmount(amount);
  const isPositive = numericAmount >= 0;
  const sign = isPositive ? '+' : '-';

  // If it's already a formatted string, use it as is
  if (typeof amount === 'string') {
    // Extract currency symbol and clean amount
    const currencySymbol = amount.match(/[₪$€£¥]/)?.[0] || '';
    const cleanAmount = amount.replace(/[₪$€£¥,]/g, '');
    const absoluteAmount = Math.abs(parseFloat(cleanAmount));

    // Format the number with proper decimal places
    const formattedNumber = absoluteAmount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return (
      <span className={`font-mono ${isPositive ? 'text-green-600' : 'text-red-500'} ${className}`}>
        {showSign && <span className="inline-block w-5 text-center font-bold text-lg">{sign}</span>}
        {currencySymbol}
        {formattedNumber}
      </span>
    );
  }

  // For numeric amounts, format as currency
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(Math.abs(numericAmount));

  return (
    <span className={`font-mono ${isPositive ? 'text-green-600' : 'text-red-500'} ${className}`}>
      {showSign && <span className="inline-block w-5 text-center font-bold text-lg">{sign}</span>}
      {formattedAmount}
    </span>
  );
};
