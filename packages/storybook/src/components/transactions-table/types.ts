// Use client GraphQL-generated types instead of duplicating
import type {
  TransactionForTransactionsTableFieldsFragment,
} from '../../../../client/src/gql/graphql.js';
import {
  Currency,
} from '../../../../client/src/gql/graphql.js';

// Re-export for other components to use
export { Currency };

// AccountType enum based on GraphQL __typename values
export enum AccountType {
  BankFinancialAccount = 'BankFinancialAccount',
  CardFinancialAccount = 'CardFinancialAccount',
  CryptoWalletFinancialAccount = 'CryptoWalletFinancialAccount',
}

// Local types for mock data (these match the GraphQL fragment structure)
export interface Account {
  __typename: 'BankFinancialAccount' | 'CardFinancialAccount' | 'CryptoWalletFinancialAccount';
  id: string;
  name: string;
  type: string;
}

export interface Business {
  id: string;
  name: string;
}

// Extend the client fragment with local callbacks used only in Storybook
export type TransactionsTableRowType = TransactionForTransactionsTableFieldsFragment & {
  onUpdate: () => void;
  editTransaction: () => void;
  enableEdit?: boolean;
  enableChargeLink?: boolean;
};

export interface TransactionsTableProps {
  data: TransactionsTableRowType[];
  enableEdit?: boolean;
  enableChargeLink?: boolean;
  onChange?: () => void;
}

// Props for individual cell components
export interface CounterpartyCellProps {
  transaction: TransactionsTableRowType;
  onChange?: () => void;
}

export interface EventDateCellProps {
  transaction: TransactionsTableRowType;
}

export interface DebitDateCellProps {
  transaction: TransactionsTableRowType;
}

export interface AmountCellProps {
  transaction: TransactionsTableRowType;
}

export interface AccountCellProps {
  transaction: TransactionsTableRowType;
}

export interface DescriptionCellProps {
  transaction: TransactionsTableRowType;
}

export interface SourceIdCellProps {
  transaction: TransactionsTableRowType;
}