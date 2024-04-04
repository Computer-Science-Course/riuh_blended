import type { Meta, StoryObj } from '@storybook/react';

import PasswordField from './index';

const meta = {
  title: 'Components/PasswordField',
  component: PasswordField,
  args: {
    label: 'Password',
    required: true,
    placeholder: 'Password',
    storeFieldValue: (value: string) => console.log(value),
  }
} satisfies Meta<typeof PasswordField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
