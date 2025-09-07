import type { Meta, StoryObj } from '@storybook/react';
import { MondayWorkflowTables } from '../../src/components/monday-style/MondayWorkflowTables';

const meta: Meta<typeof MondayWorkflowTables> = {
  title: 'MondayStyle/MondayWorkflowTables',
  component: MondayWorkflowTables,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Monday.com-style workflow tables showing transactions, documents, and ledger records with full details.',
      },
    },
  },
  argTypes: {
    transactionsCount: {
      description: 'Number of transactions to display',
      control: { type: 'number', min: 0, max: 10 },
    },
    documentsCount: {
      description: 'Number of documents to display',
      control: { type: 'number', min: 0, max: 10 },
    },
    ledgerRecordsCount: {
      description: 'Number of ledger records to display',
      control: { type: 'number', min: 0, max: 10 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MondayWorkflowTables>;

export const Default: Story = {
  args: {
    transactionsCount: 3,
    documentsCount: 2,
    ledgerRecordsCount: 4,
  },
};

export const ManyItems: Story = {
  args: {
    transactionsCount: 8,
    documentsCount: 6,
    ledgerRecordsCount: 5,
  },
};

export const FewItems: Story = {
  args: {
    transactionsCount: 1,
    documentsCount: 1,
    ledgerRecordsCount: 1,
  },
};

export const Empty: Story = {
  args: {
    transactionsCount: 0,
    documentsCount: 0,
    ledgerRecordsCount: 0,
  },
};

export const OnlyTransactions: Story = {
  args: {
    transactionsCount: 5,
    documentsCount: 0,
    ledgerRecordsCount: 0,
  },
};

export const OnlyDocuments: Story = {
  args: {
    transactionsCount: 0,
    documentsCount: 4,
    ledgerRecordsCount: 0,
  },
};

export const OnlyLedgerRecords: Story = {
  args: {
    transactionsCount: 0,
    documentsCount: 0,
    ledgerRecordsCount: 6,
  },
};
