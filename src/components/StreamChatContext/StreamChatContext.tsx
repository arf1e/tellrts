import React, {ReactNode, useState} from 'react';

export type TStreamContext = {
  channel: string | null;
  setChannel: (channel: string | null) => void;
  thread: string | null;
  setThread: (thread: string | null) => void;
};

export const StreamChatContext = React.createContext<TStreamContext>({
  channel: null,
  setChannel: channel => {},
  thread: null,
  setThread: thread => {},
});

export const StreamChatContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [channel, setChannel] = useState<string | null>(null);
  const [thread, setThread] = useState<string | null>(null);

  return (
    <StreamChatContext.Provider
      value={{channel, setChannel, thread, setThread}}>
      {children}
    </StreamChatContext.Provider>
  );
};

export const useStreamChatContext = () => React.useContext(StreamChatContext);
