import type { Meta, StoryObj } from '@storybook/react';

import Checkbox from './index';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  args: {
    label: 'Read and Agree',
    onChange: (checked: boolean) => console.log(checked),
    checked: false,
  }
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
