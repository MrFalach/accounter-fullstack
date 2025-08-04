import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SelectWithSearch } from '../src/components/ui/select-with-search';

const meta = {
  title: 'UI/SelectWithSearch',
  component: SelectWithSearch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A select component with search functionality.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SelectWithSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'next', label: 'Next.js' },
  { value: 'nuxt', label: 'Nuxt.js' },
  { value: 'gatsby', label: 'Gatsby' },
  { value: 'remix', label: 'Remix' },
];

export const Basic: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>(null);
    const [search, setSearch] = useState<string | null>(null);

    return (
      <SelectWithSearch
        options={options}
        value={value}
        onChange={setValue}
        search={search}
        onSearchChange={setSearch}
        label="Framework"
        placeholder="Search frameworks..."
        empty="No frameworks found."
      />
    );
  },
};

export const WithDefaultValue: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>('react');
    const [search, setSearch] = useState<string | null>(null);

    return (
      <SelectWithSearch
        options={options}
        value={value}
        onChange={setValue}
        search={search}
        onSearchChange={setSearch}
        label="Framework"
        placeholder="Search frameworks..."
        empty="No frameworks found."
      />
    );
  },
};
