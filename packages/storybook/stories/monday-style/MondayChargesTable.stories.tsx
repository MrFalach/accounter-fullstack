import type { Meta, StoryObj } from '@storybook/react';
import { MondayChargesTable } from '../../src/components/monday-style/MondayChargesTable';
import { mockChargesData } from '../../src/mocks/charges-data';

const meta: Meta<typeof MondayChargesTable> = {
  title: 'MondayStyle/MondayChargesTable',
  component: MondayChargesTable,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A modern, Monday.com-inspired charges table with card-based layout, advanced filtering, and grouping capabilities.',
      },
    },
  },
  argTypes: {
    data: {
      description: 'Array of charge data to display',
      control: { type: 'object' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MondayChargesTable>;

export const Default: Story = {
  args: {
    data: mockChargesData,
  },
};

export const Empty: Story = {
  args: {
    data: [],
  },
};

export const SingleCharge: Story = {
  args: {
    data: [mockChargesData[0]],
  },
};

export const FewCharges: Story = {
  args: {
    data: mockChargesData.slice(0, 3),
  },
};

export const ManyCharges: Story = {
  args: {
    data: mockChargesData,
  },
};
