import type { Meta, StoryObj } from '@storybook/react';
import { Heading } from '../src/components/ui/heading';

const meta = {
  title: 'UI/Heading',
  component: Heading,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A heading component with title and optional description.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    title: 'Welcome to Accounter',
  },
};

export const WithDescription: Story = {
  args: {
    title: 'Dashboard',
    description: 'View your financial overview and recent transactions.',
  },
};

export const LongTitle: Story = {
  args: {
    title: 'This is a very long heading title that might wrap to multiple lines',
    description: 'This description provides additional context for the heading above.',
  },
};
