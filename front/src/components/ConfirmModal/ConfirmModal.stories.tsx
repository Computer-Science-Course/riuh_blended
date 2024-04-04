import type { Meta, StoryObj } from '@storybook/react';

import ConfirmModal from './index';

const meta = {
  title: 'Components/ConfirmModal',
  component: ConfirmModal,
  args: {
    message: 'Pilot The Big Bran Hypothesis The Fuzzy Boots Corollary The Luminous Fish Effect The Hamburger Postulate The',
    isLoading: false,
    onConfirm: () => console.log('Confirm'),
    onCancel: () => console.log('Cancel'),
    onTypePassword: () => console.log('Type Password'),
  }
} satisfies Meta<typeof ConfirmModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
