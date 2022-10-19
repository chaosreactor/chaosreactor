import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Nav } from './nav';

const Story: ComponentMeta<typeof Nav> = {
  component: Nav,
  title: 'Nav',
};
export default Story;

const Template: ComponentStory<typeof Nav> = (args) => <Nav {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
