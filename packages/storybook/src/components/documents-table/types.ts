// Use client GraphQL-generated types instead of duplicating
import type {
  TableDocumentsRowFieldsFragment,
} from '../../../../client/src/gql/graphql.js';
import {
  DocumentType,
} from '../../../../client/src/gql/graphql.js';

// Re-export for other components to use
export { DocumentType };

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
    return documentType !== DocumentType.Other;
  },

  shouldHaveDate: (documentType: DocumentType): boolean => {
    return documentType !== DocumentType.Other;
  },

  shouldHaveVat: (documentType: DocumentType): boolean => {
    return documentType !== DocumentType.Other;
  },

  shouldHaveSerial: (documentType: DocumentType): boolean => {
    return documentType !== DocumentType.Other;
  },

  shouldHaveCreditor: (documentType: DocumentType): boolean => {
    return documentType !== DocumentType.Unprocessed && documentType !== DocumentType.Other;
  },

  shouldHaveDebtor: (documentType: DocumentType): boolean => {
    return documentType !== DocumentType.Unprocessed && documentType !== DocumentType.Other;
  },

  isErrorState: (documentType: DocumentType): boolean => {
    return documentType === DocumentType.Unprocessed;
  },

  isUnprocessed: (documentType: DocumentType): boolean => {
    return documentType === DocumentType.Unprocessed;
  },
};