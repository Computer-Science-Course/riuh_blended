import type { Meta, StoryObj } from '@storybook/react';

import Hyperlink from './index';

const meta = {
  title: 'Components/Hyperlink',
  component: Hyperlink,
  args: {
    text: 'I am a hyperlink',
    url: 'https://gta.fandom.com/pt/wiki/Easter_Eggs_(GTA_San_Andreas)',
    openInNewTab: true,
  }
} satisfies Meta<typeof Hyperlink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
