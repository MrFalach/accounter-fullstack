import type { Meta, StoryObj } from '@storybook/react';
import { StatsCard } from '../src/components/charts/stats-card';

const meta = {
  title: 'Charts/StatsCard',
  component: StatsCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A stats card component that displays key metrics in a grid layout.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of stats items to display',
    },
  },
} satisfies Meta<typeof StatsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default stats
export const Default: Story = {
  args: {
    items: [
      { title: 'Total Revenue', number: '$45,231.89' },
      { title: 'Subscriptions', number: '+2350' },
      { title: 'Sales', number: '+12,234' },
      { title: 'Active Now', number: '+573' },
    ],
  },
};

// Financial metrics
export const FinancialMetrics: Story = {
  args: {
    items: [
      { title: 'Monthly Revenue', number: '$12,345', color: 'green' },
      { title: 'Monthly Expenses', number: '$8,234', color: 'red' },
      { title: 'Net Profit', number: '$4,111', color: 'green' },
      { title: 'Growth Rate', number: '+12.5%', color: 'green' },
    ],
  },
};

// Business metrics
export const BusinessMetrics: Story = {
  args: {
    items: [
      { title: 'Total Customers', number: '1,234' },
      { title: 'Active Projects', number: '56' },
      { title: 'Team Members', number: '23' },
      { title: 'Completion Rate', number: '94%' },
    ],
  },
};

// Single stat
export const SingleStat: Story = {
  args: {
    items: [{ title: 'Total Revenue', number: '$123,456.78' }],
  },
};
