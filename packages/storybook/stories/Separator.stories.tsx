import type { Meta, StoryObj } from '@storybook/react';
import { Separator } from '../src/components/ui/separator';

const meta = {
  title: 'UI/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A separator component for dividing content sections.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div className="w-[400px] space-y-4">
      <div>Content above</div>
      <Separator />
      <div>Content below</div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-[100px] items-center space-x-4">
      <div>Left content</div>
      <Separator orientation="vertical" />
      <div>Right content</div>
    </div>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <div className="w-[400px] space-y-4">
      <div>Content above</div>
      <Separator className="bg-blue-500 h-0.5" />
      <div>Content below</div>
    </div>
  ),
};
