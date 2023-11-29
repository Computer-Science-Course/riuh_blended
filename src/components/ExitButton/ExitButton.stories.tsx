import type { Meta, StoryObj } from '@storybook/react';

import ExitButton from './index';

const meta = {
  title: 'Components/ExitButton',
  component: ExitButton,
} satisfies Meta<typeof ExitButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
