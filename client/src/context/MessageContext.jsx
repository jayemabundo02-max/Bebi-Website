import { useMessage } from "../hooks/useMessage.js";

import { createContext, useContext } from "react";

const MessageContext = createContext(null);

export const MessageProvider = ({ children }) => {
  const messages = useMessage();
  return <MessageContext.Provider value={messages}>{children}</MessageContext.Provider>;
};

export const useMessageContext = () => useContext(MessageContext);
