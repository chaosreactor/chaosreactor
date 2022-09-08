import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Ui } from './ui';

export default {
  component: Ui,
  title: 'Ui',
} as ComponentMeta<typeof Ui>;

const Template: ComponentStory<typeof Ui> = (args) => <Ui {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
