import type { Meta, StoryObj } from '@storybook/react';

import Toast from './index';

const meta = {
  title: 'Components/Toast',
  component: Toast,
  args: {
    message: 'This is a toast message',
    variation: 'standard',
    duration: 3,
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
