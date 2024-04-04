import type { Meta, StoryObj } from '@storybook/react';

import Button from './index';

const meta = {
  title: 'Components/Button',
  component: Button,
  args: {
    label: 'Click me :D',
    disabledStatus: false,
    loading: false,
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
