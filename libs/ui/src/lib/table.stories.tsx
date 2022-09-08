import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Table } from './table';

export default {
  component: Table,
  title: 'Table',
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
