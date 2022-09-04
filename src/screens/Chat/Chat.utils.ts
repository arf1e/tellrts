import {SubscribeToMoreOptions} from '@apollo/client';
import {CHAT_SUBSCRIPTION, SeeChatResult} from './Chat.graphql';

export const subscribeToChatUpdates =
  (
    subscribeToMore: <
      TSubscriptionData = SeeChatResult,
      TSubscriptionVariables = {
        userId: number;
      },
    >(
      options: SubscribeToMoreOptions<
        SeeChatResult,
        TSubscriptionVariables,
        TSubscriptionData
      >,
    ) => () => void,
    userId: number,
  ) =>
  () => {
    return subscribeToMore({
      document: CHAT_SUBSCRIPTION,
      variables: {userId},
      updateQuery: (prev, {subscriptionData}) => {
        if (!subscriptionData.data) {
          return prev;
        }

        const newMessage = subscriptionData.data.chatUpdates;

        return Object.assign({}, prev, {
          seeChat: [...prev.seeChat, newMessage],
        });
      },
    });
  };
