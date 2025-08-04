import { toast } from 'sonner';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../src/components/ui/button';
import { Toaster } from '../src/components/ui/sonner';

const meta = {
  title: 'UI/Sonner',
  component: Toaster,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A toast notification component.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button onClick={() => toast('My first toast')}>Default toast</Button>
        <Button onClick={() => toast.success('Success toast')}>Success toast</Button>
        <Button onClick={() => toast.error('Error toast')}>Error toast</Button>
      </div>
      <Toaster />
    </div>
  ),
};

export const WithActions: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button
          onClick={() =>
            toast('Event has been created', {
              action: {
                label: 'Undo',
                onClick: () => console.log('Undo'),
              },
            })
          }
        >
          Toast with action
        </Button>
        <Button
          onClick={() =>
            toast('Event has been created', {
              action: {
                label: 'Undo',
                onClick: () => console.log('Undo'),
              },
              cancel: {
                label: 'Dismiss',
                onClick: () => console.log('Dismiss'),
              },
            })
          }
        >
          Toast with action and cancel
        </Button>
      </div>
      <Toaster />
    </div>
  ),
};
