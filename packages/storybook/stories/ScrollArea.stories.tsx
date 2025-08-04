import type { Meta, StoryObj } from '@storybook/react';
import { ScrollArea } from '../src/components/ui/scroll-area';

const meta = {
  title: 'UI/ScrollArea',
  component: ScrollArea,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A scroll area component with custom scrollbars.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
      <div className="space-y-4">
        <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
        <p className="text-sm text-muted-foreground">
          An open-source UI component library for building high-quality, accessible design systems
          and web apps.
        </p>
        <div className="space-y-2">
          <div className="text-sm">
            <span className="font-medium">@radix-ui/react-accordion</span>
            <p className="text-muted-foreground">Collapsible accordion component.</p>
          </div>
          <div className="text-sm">
            <span className="font-medium">@radix-ui/react-alert-dialog</span>
            <p className="text-muted-foreground">Modal dialog for important actions.</p>
          </div>
          <div className="text-sm">
            <span className="font-medium">@radix-ui/react-aspect-ratio</span>
            <p className="text-muted-foreground">Maintains responsive aspect ratio.</p>
          </div>
          <div className="text-sm">
            <span className="font-medium">@radix-ui/react-avatar</span>
            <p className="text-muted-foreground">User profile picture component.</p>
          </div>
          <div className="text-sm">
            <span className="font-medium">@radix-ui/react-checkbox</span>
            <p className="text-muted-foreground">Checkbox input component.</p>
          </div>
          <div className="text-sm">
            <span className="font-medium">@radix-ui/react-collapsible</span>
            <p className="text-muted-foreground">Collapsible content component.</p>
          </div>
          <div className="text-sm">
            <span className="font-medium">@radix-ui/react-context-menu</span>
            <p className="text-muted-foreground">Context menu component.</p>
          </div>
          <div className="text-sm">
            <span className="font-medium">@radix-ui/react-dialog</span>
            <p className="text-muted-foreground">Modal dialog component.</p>
          </div>
          <div className="text-sm">
            <span className="font-medium">@radix-ui/react-dropdown-menu</span>
            <p className="text-muted-foreground">Dropdown menu component.</p>
          </div>
          <div className="text-sm">
            <span className="font-medium">@radix-ui/react-hover-card</span>
            <p className="text-muted-foreground">Hover card component.</p>
          </div>
        </div>
      </div>
    </ScrollArea>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <ScrollArea className="w-96 whitespace-nowrap rounded-md border">
      <div className="flex w-max space-x-4 p-4">
        <div className="w-[200px] space-y-2">
          <p className="text-sm font-medium leading-none">Apple MacBook Pro</p>
          <p className="text-xs text-muted-foreground">Laptop</p>
        </div>
        <div className="w-[200px] space-y-2">
          <p className="text-sm font-medium leading-none">Apple iPhone 15</p>
          <p className="text-xs text-muted-foreground">Smartphone</p>
        </div>
        <div className="w-[200px] space-y-2">
          <p className="text-sm font-medium leading-none">Apple iPad Pro</p>
          <p className="text-xs text-muted-foreground">Tablet</p>
        </div>
        <div className="w-[200px] space-y-2">
          <p className="text-sm font-medium leading-none">Apple Watch</p>
          <p className="text-xs text-muted-foreground">Smartwatch</p>
        </div>
        <div className="w-[200px] space-y-2">
          <p className="text-sm font-medium leading-none">Apple AirPods</p>
          <p className="text-xs text-muted-foreground">Headphones</p>
        </div>
        <div className="w-[200px] space-y-2">
          <p className="text-sm font-medium leading-none">Apple HomePod</p>
          <p className="text-xs text-muted-foreground">Smart Speaker</p>
        </div>
      </div>
    </ScrollArea>
  ),
};
