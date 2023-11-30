import type { Meta, StoryObj } from '@storybook/react';

import MenuButton from './index';

const meta = {
  title: 'Components/MenuButton',
  component: MenuButton,
  args: {
    onClick: () => { },
  }
} satisfies Meta<typeof MenuButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
