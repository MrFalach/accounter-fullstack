import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../src/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../src/components/ui/tabs';

const meta = {
  title: 'UI/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A tabs component for organizing content into multiple views.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic tabs
export const Basic: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                defaultValue="Pedro Duarte"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                defaultValue="@peduarte"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <label htmlFor="current">Current password</label>
              <input
                id="current"
                type="password"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="new">New password</label>
              <input
                id="new"
                type="password"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ),
};

// Multiple tabs
export const MultipleTabs: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-[600px]">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>Get a quick overview of your account.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This is the overview content.</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="analytics">
        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
            <CardDescription>View your analytics and metrics.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This is the analytics content.</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="reports">
        <Card>
          <CardHeader>
            <CardTitle>Reports</CardTitle>
            <CardDescription>Generate and view reports.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This is the reports content.</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Manage your notification preferences.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This is the notifications content.</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ),
};

// Financial tabs
export const FinancialTabs: Story = {
  render: () => (
    <Tabs defaultValue="income" className="w-[500px]">
      <TabsList>
        <TabsTrigger value="income">Income</TabsTrigger>
        <TabsTrigger value="expenses">Expenses</TabsTrigger>
        <TabsTrigger value="investments">Investments</TabsTrigger>
      </TabsList>
      <TabsContent value="income">
        <Card>
          <CardHeader>
            <CardTitle>Income</CardTitle>
            <CardDescription>Track your income sources.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Salary</span>
                <span className="text-green-600">$5,000</span>
              </div>
              <div className="flex justify-between">
                <span>Freelance</span>
                <span className="text-green-600">$1,200</span>
              </div>
              <div className="flex justify-between">
                <span>Investments</span>
                <span className="text-green-600">$800</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="expenses">
        <Card>
          <CardHeader>
            <CardTitle>Expenses</CardTitle>
            <CardDescription>Track your monthly expenses.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Rent</span>
                <span className="text-red-600">-$2,000</span>
              </div>
              <div className="flex justify-between">
                <span>Utilities</span>
                <span className="text-red-600">-$300</span>
              </div>
              <div className="flex justify-between">
                <span>Groceries</span>
                <span className="text-red-600">-$500</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="investments">
        <Card>
          <CardHeader>
            <CardTitle>Investments</CardTitle>
            <CardDescription>Monitor your investment portfolio.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Stocks</span>
                <span className="text-green-600">$15,000</span>
              </div>
              <div className="flex justify-between">
                <span>Bonds</span>
                <span className="text-green-600">$8,000</span>
              </div>
              <div className="flex justify-between">
                <span>Real Estate</span>
                <span className="text-green-600">$50,000</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ),
};
