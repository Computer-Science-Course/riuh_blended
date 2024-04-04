import type { Meta, StoryObj } from '@storybook/react';

import Menu from './index';

const meta = {
  title: 'Components/Menu',
  component: Menu,
  args: {
    cashierAction: () => console.log('cashierAction'),
    clientAction: () => console.log('clientAction'),
    employeeAction: () => console.log('employeeAction'),
    productAction: () => console.log('productAction'),
    reportAction: () => console.log('reportAction'),
  }
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
