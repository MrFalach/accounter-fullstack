import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../src/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../src/components/ui/dialog';

const meta = {
  title: 'UI/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A dialog component for modal interactions and confirmations.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic dialog
export const Basic: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={action('cancel-clicked')}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={action('confirm-clicked')}>
            Delete Account
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// Form dialog
export const FormDialog: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right">
              Name
            </label>
            <input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3 border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="username" className="text-right">
              Username
            </label>
            <input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3 border border-gray-300 rounded px-3 py-2"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={action('cancel-clicked')}>
            Cancel
          </Button>
          <Button onClick={action('save-clicked')}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// Alert dialog
export const AlertDialog: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Item</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Item</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this item? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={action('cancel-clicked')}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={action('delete-clicked')}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// Large content dialog
export const LargeContent: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>View Details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Transaction Details</DialogTitle>
          <DialogDescription>Detailed information about this transaction.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Amount</label>
              <p className="text-lg font-semibold text-green-600">$1,250.50</p>
            </div>
            <div>
              <label className="text-sm font-medium">Date</label>
              <p className="text-sm">January 15, 2024</p>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Description</label>
            <p className="text-sm">Salary deposit from employer</p>
          </div>
          <div>
            <label className="text-sm font-medium">Category</label>
            <p className="text-sm">Income</p>
          </div>
          <div>
            <label className="text-sm font-medium">Account</label>
            <p className="text-sm">Main Bank Account</p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={action('close-clicked')}>
            Close
          </Button>
          <Button onClick={action('edit-clicked')}>Edit Transaction</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
