import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Nav, NavProps } from './nav';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  component: Nav,
} as ComponentMeta<typeof Nav>;

const Basic: ComponentStory<typeof Nav> = () => <Nav />;

const WithProp: ComponentStory<typeof Nav> = (props: NavProps) => {
  const { title } = props;

  return (
    <Nav title={title}>
      <div>Child content</div>
    </Nav>
  );
};

export const Primary = Basic.bind({});
export const WithTitleProp = WithProp.bind({});

WithTitleProp.args = {
  title: 'Voxable',
};

// Nav.story.ts|tsx
