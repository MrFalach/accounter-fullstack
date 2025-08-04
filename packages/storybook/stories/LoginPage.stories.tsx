import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { LoginPage } from '../src/components/login-page';

const meta = {
  title: 'Pages/LoginPage',
  component: LoginPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A login page component with form validation and responsive design.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'The main title of the login page',
    },
    subtitle: {
      control: { type: 'text' },
      description: 'The subtitle of the login page',
    },
    onSubmit: {
      action: 'form-submitted',
    },
  },
} satisfies Meta<typeof LoginPage>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default login page
export const Default: Story = {
  args: {
    onSubmit: action('login-submitted'),
  },
};

// Custom branding
export const CustomBranding: Story = {
  args: {
    title: 'MyApp',
    subtitle: 'Sign In',
    onSubmit: action('login-submitted'),
  },
};

// Different company branding
export const CompanyBranding: Story = {
  args: {
    title: 'EnterpriseCorp',
    subtitle: 'Employee Portal',
    onSubmit: action('login-submitted'),
  },
};
