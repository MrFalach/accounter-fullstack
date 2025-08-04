import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../src/components/ui/input';
import { Label } from '../src/components/ui/label';

const meta = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible input component with various types and states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'email', 'number', 'tel', 'url', 'search'],
      description: 'The type of input',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the input is disabled',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic input
export const Basic: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

// Input with label
export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="m@example.com" />
    </div>
  ),
};

// Different input types
export const InputTypes: Story = {
  render: () => (
    <div className="grid gap-4 w-full max-w-sm">
      <div className="grid gap-1.5">
        <Label htmlFor="text">Text</Label>
        <Input type="text" id="text" placeholder="Enter text" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" placeholder="m@example.com" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input type="password" id="password" placeholder="Enter password" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="number">Number</Label>
        <Input type="number" id="number" placeholder="Enter number" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="tel">Phone</Label>
        <Input type="tel" id="tel" placeholder="Enter phone number" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="url">URL</Label>
        <Input type="url" id="url" placeholder="https://example.com" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="search">Search</Label>
        <Input type="search" id="search" placeholder="Search..." />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
  },
};

// File input
export const FileInput: Story = {
  args: {
    type: 'file',
  },
};

// Input with error state
export const WithError: Story = {
  args: {
    placeholder: 'Input with error',
    'aria-invalid': true,
  },
};
