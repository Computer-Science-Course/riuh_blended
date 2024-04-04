import type { Meta, StoryObj } from '@storybook/react';

import SearchField from './index';

const meta = {
  title: 'Components/SearchField',
  component: SearchField,
  args: {
    label: 'Search',
    placeholder: 'Search...',
    required: true,
    storeFieldValue: (value: string) => console.log(value),
  }
} satisfies Meta<typeof SearchField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
