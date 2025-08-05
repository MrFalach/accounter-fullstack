import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '../src/components/ui/checkbox';
import { Input } from '../src/components/ui/input';
import { Label } from '../src/components/ui/label';

const meta = {
  title: 'UI/Label',
  component: Label,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A label component for form elements with proper accessibility.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: { type: 'text' },
      description: 'The label text content',
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes for styling',
    },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic label
export const Basic: Story = {
  args: {
    children: 'Email',
  },
};

// Label with input
export const WithInput: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="Enter your email" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Label associated with an input field using htmlFor attribute.',
      },
    },
  },
};

// Label with checkbox
export const WithCheckbox: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Label associated with a checkbox for terms and conditions.',
      },
    },
  },
};

// Label with select
export const WithSelect: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="country">Country</Label>
      <select
        id="country"
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <option value="">Select a country</option>
        <option value="us">United States</option>
        <option value="ca">Canada</option>
        <option value="uk">United Kingdom</option>
      </select>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Label associated with a select dropdown.',
      },
    },
  },
};

// Multiple labels
export const MultipleLabels: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-4">
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="Enter your name" />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="Enter your email" />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" type="tel" placeholder="Enter your phone number" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple labels in a form layout.',
      },
    },
  },
};

// Required label
export const Required: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">
        Email <span className="text-red-500">*</span>
      </Label>
      <Input id="email" type="email" placeholder="Enter your email" required />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Label indicating a required field with visual indicator.',
      },
    },
  },
};

// Disabled label
export const Disabled: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="disabled-input" className="text-muted-foreground">
        Disabled Field
      </Label>
      <Input id="disabled-input" disabled placeholder="This field is disabled" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Label for a disabled input field with muted styling.',
      },
    },
  },
};
