import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Nav } from './nav';

export default {
  component: Nav,
  title: 'Nav',
} as ComponentMeta<typeof Nav>;

const Template: ComponentStory<typeof Nav> = (args) => <Nav {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
