import type { Meta, StoryObj } from '@storybook/react';

import Calendar from './index';

const meta = {
  title: 'Components/Calendar',
  component: Calendar,
  args: {
    storeFieldValue: (value: string) => console.log(value),
    label: 'Calendar',
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
