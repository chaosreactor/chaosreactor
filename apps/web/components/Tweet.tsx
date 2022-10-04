import { ChakraProvider } from '@chakra-ui/react';
import chaosTheme from '../theme';
import { Tweet } from 'react-twitter-widgets';

const ChakraForm = (tweetId: string) => {
  return (
    <ChakraProvider theme={chaosTheme}>
      <Tweet tweetId={tweetId} options={{ theme: 'dark' }} />
    </ChakraProvider>
  );
};

export default Tweet;
