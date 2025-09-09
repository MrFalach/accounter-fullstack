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
};

export default meta;
type Story = StoryObj<typeof MondayChargesTable>;

export const Default: Story = {
  args: {
    data: mockChargesData,
    defaultView: 'collapsed',
    oneAtATime: true,
  },
};

export const ExpandedByDefault: Story = {
  args: {
    data: mockChargesData,
    defaultView: 'expanded',
    oneAtATime: true,
  },
};

export const Empty: Story = {
  args: {
    data: [],
    defaultView: 'collapsed',
    oneAtATime: true,
  },
};

export const SingleCharge: Story = {
  args: {
    data: [mockChargesData[0]],
    defaultView: 'collapsed',
    oneAtATime: true,
  },
};

export const FewCharges: Story = {
  args: {
    data: mockChargesData.slice(0, 3),
    defaultView: 'collapsed',
    oneAtATime: true,
  },
};

export const ManyCharges: Story = {
  args: {
    data: mockChargesData,
    defaultView: 'collapsed',
    oneAtATime: true,
  },
};
