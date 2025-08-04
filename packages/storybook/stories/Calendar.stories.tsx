import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from '../src/components/ui/calendar';

const meta = {
  title: 'UI/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A calendar component for date selection and display.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: { type: 'select' },
      options: ['single', 'multiple', 'range'],
      description: 'The selection mode of the calendar',
    },
    showOutsideDays: {
      control: { type: 'boolean' },
      description: 'Show days from adjacent months',
    },
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};

export const Range: Story = {
  args: {
    mode: 'range',
  },
};

export const Multiple: Story = {
  args: {
    mode: 'multiple',
  },
};

export const HideOutsideDays: Story = {
  args: {
    showOutsideDays: false,
  },
};
