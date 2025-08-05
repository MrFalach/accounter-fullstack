import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../src/components/ui/Button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../src/components/ui/tooltip';

const meta = {
  title: 'UI/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A tooltip component for displaying contextual information on hover or focus.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button>Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>Tooltip content goes here</TooltipContent>
    </Tooltip>
  ),
};

export const WithDelay: Story = {
  render: () => (
    <Tooltip delayDuration={500}>
      <TooltipTrigger asChild>
        <Button>Hover me (500ms delay)</Button>
      </TooltipTrigger>
      <TooltipContent>Tooltip with delay</TooltipContent>
    </Tooltip>
  ),
};

export const Placement: Story = {
  render: () => (
    <div className="flex gap-8">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button>Top</Button>
        </TooltipTrigger>
        <TooltipContent side="top">Top placement</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button>Right</Button>
        </TooltipTrigger>
        <TooltipContent side="right">Right placement</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button>Bottom</Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Bottom placement</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button>Left</Button>
        </TooltipTrigger>
        <TooltipContent side="left">Left placement</TooltipContent>
      </Tooltip>
    </div>
  ),
};
