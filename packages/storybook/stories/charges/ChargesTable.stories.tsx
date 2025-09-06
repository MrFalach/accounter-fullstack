import React from 'react';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { ChargesTable } from '../../src/components/charges';
import { mockChargesData } from '../../src/mocks';

const meta = {
  title: 'Components/Charges/ChargesTable',
  component: ChargesTable,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A comprehensive charges table that displays financial charges with expandable rows showing detailed information. Each row can be clicked to reveal transaction details, documents, and ledger records in a drawer-like interface.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      description: 'Array of charge records to display',
      control: 'object',
    },
    isAllOpened: {
      description: 'Whether all charges should be expanded by default',
      control: 'boolean',
    },
  },
} satisfies Meta<typeof ChargesTable>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story with all charges collapsed
export const Default: Story = {
  args: {
    data: mockChargesData,
    isAllOpened: false,
  },
};

// Story with minimal data
export const MinimalData: Story = {
  args: {
    data: mockChargesData.slice(0, 2),
    isAllOpened: false,
  },
};

// Story with different charge types
export const MixedChargeTypes: Story = {
  args: {
    data: mockChargesData.filter(charge =>
      ['Common', 'CreditCardBankCharge', 'BusinessTripCharge'].includes(charge.__typename),
    ),
    isAllOpened: false,
  },
};

// Story showing business trip charges
export const WithBusinessTrip: Story = {
  args: {
    data: mockChargesData.filter(charge => charge.__typename === 'BusinessTripCharge'),
    isAllOpened: false,
  },
};
