import { AlertCircle, CheckCircle, Clock, Mail } from 'lucide-react';
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../src/components/ui/badge';

const meta = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A badge component for displaying status, labels, and notifications.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'secondary', 'destructive', 'outline'],
      description: 'The visual style variant of the badge',
    },
    children: {
      control: { type: 'text' },
      description: 'The content of the badge',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic badge
export const Basic: Story = {
  args: {
    children: 'Badge',
  },
};

// All variants
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available badge variants with their distinct visual styles.',
      },
    },
  },
};

// Badges with icons
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>
        <Mail className="w-3 h-3" />
        New Message
      </Badge>
      <Badge variant="secondary">
        <Clock className="w-3 h-3" />
        Pending
      </Badge>
      <Badge variant="destructive">
        <AlertCircle className="w-3 h-3" />
        Error
      </Badge>
      <Badge variant="outline">
        <CheckCircle className="w-3 h-3" />
        Success
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badges with icons for better visual communication.',
      },
    },
  },
};

// Status badges
export const StatusBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Active</Badge>
      <Badge variant="secondary">Draft</Badge>
      <Badge variant="destructive">Failed</Badge>
      <Badge variant="outline">Archived</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common use case for badges - displaying status information.',
      },
    },
  },
};

// Notification badges
export const NotificationBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>12</Badge>
      <Badge variant="secondary">3</Badge>
      <Badge variant="destructive">!</Badge>
      <Badge variant="outline">New</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badges commonly used for notification counts and alerts.',
      },
    },
  },
};
