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
    defaultView: {
      description: 'Default view mode for the table',
      control: 'select',
      options: ['collapsed', 'expanded'],
    },
    oneAtATime: {
      description: 'Whether only one row can be expanded at a time',
      control: 'boolean',
    },
  },
} satisfies Meta<typeof ChargesTable>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story with all charges collapsed (minimalistic view)
export const Default: Story = {
  args: {
    data: mockChargesData,
    defaultView: 'collapsed',
    oneAtATime: true,
  },
};

// Story with charges expanded by default (full view)
export const ExpandedByDefault: Story = {
  args: {
    data: mockChargesData,
    defaultView: 'expanded',
    oneAtATime: true,
  },
};

// Story with minimal data
export const MinimalData: Story = {
  args: {
    data: mockChargesData.slice(0, 2),
    defaultView: 'collapsed',
    oneAtATime: true,
  },
};

// Story with different charge types
export const MixedChargeTypes: Story = {
  args: {
    data: mockChargesData.filter(charge =>
      ['Common', 'CreditCardBankCharge', 'BusinessTripCharge'].includes(charge.__typename),
    ),
    defaultView: 'collapsed',
    oneAtATime: true,
  },
};

// Story showing business trip charges
export const WithBusinessTrip: Story = {
  args: {
    data: mockChargesData.filter(charge => charge.__typename === 'BusinessTripCharge'),
    defaultView: 'collapsed',
    oneAtATime: true,
  },
};
