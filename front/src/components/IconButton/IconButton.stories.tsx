import type { Meta, StoryObj } from '@storybook/react';

import IconButton from './index';

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  args: {
    icon: 'delete',
    onClick: () => { },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
