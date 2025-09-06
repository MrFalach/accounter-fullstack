import React from 'react';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { ChargeExtendedInfo } from '../../src/components/charges';
import { mockChargesData } from '../../src/mocks';

const meta = {
  title: 'Components/Charges/ChargeExtendedInfo',
  component: ChargeExtendedInfo,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A detailed charge view component that displays comprehensive information about a specific charge including transactions, documents, and ledger records in separate tables.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    chargeID: {
      description: 'The ID of the charge to display',
      control: 'text',
    },
    onChange: {
      description: 'Callback function when data changes',
      action: 'onChange',
    },
    fetching: {
      description: 'Whether the component is in a loading state',
      control: 'boolean',
    },
  },
} satisfies Meta<typeof ChargeExtendedInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story with a realistic charge
export const FullCharge: Story = {
  args: {
    chargeID: 'charge-2', // Amazon Web Services charge
    onChange: action('onChange'),
    fetching: false,
  },
};

// Loading state
export const Loading: Story = {
  args: {
    chargeID: 'charge-1',
    onChange: action('onChange'),
    fetching: true,
  },
};

// Minimal charge with fewer records
export const MinimalCharge: Story = {
  args: {
    chargeID: 'charge-5', // Stripe Payments charge
    onChange: action('onChange'),
    fetching: false,
  },
};

// Different charge type
export const DifferentCharge: Story = {
  args: {
    chargeID: 'charge-4', // Business Trip charge
    onChange: action('onChange'),
    fetching: false,
  },
};
