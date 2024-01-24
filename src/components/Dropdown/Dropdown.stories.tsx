import type { Meta, StoryObj } from '@storybook/react';

import Dropdown from './index';
import Item from './Item';

const options = [
  'The Big Bang Theory',
  'Friends',
  'How I Met Your Mother',
  'Modern Family',
  'The Office',
  'Everybody Hates Chris',
  'Arnold',
]

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  args: {
    label: 'TV Show',
    children: options.map(option => (
      <Item
        handleSelect={console.log}
        label={option}
        value='Some value'
      />
    ))
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: '',
  },
};
