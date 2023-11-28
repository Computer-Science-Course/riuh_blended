import type { Meta, StoryObj } from '@storybook/react';

import Dropdown from './index';

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  args: {
    onChange: () => { },
    options: [
      'The Big Bang Theory',
      'Friends',
      'How I Met Your Mother',
      'Modern Family',
      'The Office',
      'Everybody Hates Chris',
      'Arnold',
    ],
    label: 'TV Show',
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
