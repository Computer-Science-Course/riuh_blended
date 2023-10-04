import type { Meta, StoryObj } from '@storybook/react';

import Test from './index';

const meta = {
  title: 'Example/Test',
  component: Test,
} satisfies Meta<typeof Test>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
