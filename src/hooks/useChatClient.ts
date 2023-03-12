import {useEffect, useState} from 'react';
import {TChatUser} from '../screens/Chat/Chat.graphql';
import {getStreamChatInstance} from '../utils/streamChat';

export const useChatClient = (user: TChatUser, token: string) => {
  const [clientIsReady, setClientIsReady] = useState(false);
  const chatClient = getStreamChatInstance();

  useEffect(() => {
    const setupClient = async () => {
      try {
        await chatClient.connectUser(
          {
            id: user.id.toString(),
            name: user.name,
          },
          token,
        );
        setClientIsReady(true);
        // connectUser is an async function. So you can choose to await for it or not depending on your use case (e.g. to show custom loading indicator)
        // But in case you need the chat to load from offline storage first then you should render chat components
        // immediately after calling `connectUser()`.
        // BUT ITS NECESSARY TO CALL connectUser FIRST IN ANY CASE.
      } catch (error) {
        if (error instanceof Error) {
          console.error(
            `An error occurred while connecting the user: ${error.message}`,
          );
        }
      }
    };

    // If the chat client has a value in the field `userID`, a user is already connected
    // and we can skip trying to connect the user again.
    if (!chatClient.userID) {
      setupClient();
    } else {
      setClientIsReady(true);
    }
  }, [user, token, chatClient]);

  return {
    clientIsReady,
  };
};
