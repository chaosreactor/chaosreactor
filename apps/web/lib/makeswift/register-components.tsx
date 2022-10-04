// @see https://www.aknapen.nl/blog/collect-emails-from-nextjs-form-in-hubspot/

import SignupForm from '../../components/SignupForm';
import Tweet from '../../components/Tweet';
import { Style, TextInput } from '@makeswift/runtime/controls';
import { ReactRuntime } from '@makeswift/runtime/react';

// Register your components here!

function HelloWorld(props: { className?: string }) {
  return <p {...props}>Hello, world!</p>;
}

ReactRuntime.registerComponent(HelloWorld, {
  type: 'hello-world',
  label: 'Hello, world!',
  props: {
    className: Style({ properties: Style.All }),
  },
});

ReactRuntime.registerComponent(SignupForm, {
  type: 'signup-form',
  label: 'Signup Form',
  props: {
    className: Style({ properties: Style.All }),
  },
});

ReactRuntime.registerComponent(Tweet, {
  type: 'tweet',
  label: 'Tweet',
  props: {
    className: Style({ properties: Style.All }),
    tweetId: TextInput({
      label: 'Tweet ID',
      defaultValue: '841418541026877441',
    }),
  },
});
