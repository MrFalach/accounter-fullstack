// Use client GraphQL-generated types instead of duplicating
import type {
  TableDocumentsRowFieldsFragment,
  DocumentType,
} from '@accounter/client/src/gql/graphql.js';

// Extend the client fragment with local callbacks used only in Storybook
export type DocumentsTableRowType = TableDocumentsRowFieldsFragment & {
  onUpdate: () => void;
  editDocument: () => void;
};

export interface DocumentsTableProps {
  data: DocumentsTableRowType[];
  onChange: () => void;
}

// Props for individual cell components
export interface AmountCellProps {
  document: DocumentsTableRowType;
}

export interface DateCellProps {
  document: DocumentsTableRowType;
}

export interface TypeCellProps {
  document: DocumentsTableRowType;
}

export interface SerialCellProps {
  document: DocumentsTableRowType;
}

export interface VatCellProps {
  document: DocumentsTableRowType;
}

export interface FilesCellProps {
  document: DocumentsTableRowType;
}

export interface CreditorCellProps {
  document: DocumentsTableRowType;
}

export interface DebtorCellProps {
  document: DocumentsTableRowType;
}

// Helper functions for document validation logic (use client enum)
export const DocumentValidation = {
  shouldHaveAmount: (documentType: DocumentType): boolean => {
    return documentType !== 'Other';
  },

  shouldHaveDate: (documentType: DocumentType): boolean => {
    return documentType !== 'Other';
  },

  shouldHaveVat: (documentType: DocumentType): boolean => {
    return documentType !== 'Other';
  },

  shouldHaveSerial: (documentType: DocumentType): boolean => {
    return documentType !== 'Other';
  },

  shouldHaveCreditor: (documentType: DocumentType): boolean => {
    return documentType !== 'Unprocessed' && documentType !== 'Other';
  },

  shouldHaveDebtor: (documentType: DocumentType): boolean => {
    return documentType !== 'Unprocessed' && documentType !== 'Other';
  },

  isErrorState: (documentType: DocumentType): boolean => {
    return documentType === 'Unprocessed';
  },

  isUnprocessed: (documentType: DocumentType): boolean => {
    return documentType === 'Unprocessed';
  },
};