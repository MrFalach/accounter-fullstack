import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import type { Meta, StoryObj } from '@storybook/react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../src/components/ui/chart';

const meta = {
  title: 'UI/Chart',
  component: ChartContainer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A chart component for data visualization.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ChartContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

const data = [
  { month: 'Jan', total: 100 },
  { month: 'Feb', total: 120 },
  { month: 'Mar', total: 90 },
  { month: 'Apr', total: 150 },
  { month: 'May', total: 180 },
  { month: 'Jun', total: 200 },
  { month: 'Jul', total: 220 },
  { month: 'Aug', total: 250 },
  { month: 'Sep', total: 280 },
  { month: 'Oct', total: 300 },
  { month: 'Nov', total: 320 },
  { month: 'Dec', total: 350 },
];

const config = {
  total: {
    label: 'Total',
    color: 'hsl(var(--chart-1))',
  },
};

export const Basic: Story = {
  render: () => (
    <ChartContainer config={config}>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={value => `$${value}`}
          />
          <ChartTooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return <ChartTooltipContent active={active} payload={payload} label="Total" />;
              }
              return null;
            }}
          />
          <Line
            dataKey="total"
            fill="currentColor"
            className="fill-primary"
            strokeWidth={2}
            type="monotone"
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  ),
};
