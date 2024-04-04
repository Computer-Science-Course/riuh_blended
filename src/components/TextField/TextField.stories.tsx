import type { Meta, StoryObj } from '@storybook/react';

import TextField from './index';

const meta = {
  title: 'Components/TextField',
  component: TextField,
  args: {
    label: '',
    required: false,
    storeFieldValue: (value: string) => console.log(value),
  }
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
