import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../src/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../src/components/ui/popover';

const meta = {
  title: 'UI/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A popover component for displaying floating content anchored to a trigger.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <h4 className="font-medium">Popover Title</h4>
          <p className="text-sm text-gray-500">This is the popover content.</p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const Placement: Story = {
  render: () => (
    <div className="flex gap-8">
      <Popover>
        <PopoverTrigger asChild>
          <Button>Top</Button>
        </PopoverTrigger>
        <PopoverContent side="top">Top placement</PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <Button>Right</Button>
        </PopoverTrigger>
        <PopoverContent side="right">Right placement</PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <Button>Bottom</Button>
        </PopoverTrigger>
        <PopoverContent side="bottom">Bottom placement</PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <Button>Left</Button>
        </PopoverTrigger>
        <PopoverContent side="left">Left placement</PopoverContent>
      </Popover>
    </div>
  ),
};
