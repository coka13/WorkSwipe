import React, { useState } from "react";
import { MinChatUiProvider, MainContainer, MessageInput, MessageContainer, MessageList, MessageHeader } from "@minchat/react-chat-ui";
import IconButton from "@mui/material/IconButton";

import "./ChatAssistant.css";

function ChatAssistant({ text,user1,user2, chatIcon }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
        
      <IconButton onClick={toggleChat}>
      {text}
        {chatIcon  }
      </IconButton>
      {isOpen && (
        <MinChatUiProvider theme="#6ea9d7">
          <MainContainer className="chat-assistant">
            <MessageContainer>
              <MessageHeader />
              <MessageList
                currentUserId="dan"
                messages={[
                  {
                    text: "Hello",
                    user: {
                      id: "mark",
                      name: "WorkSwipe",
                    },
                  },
                ]}
              />
              <MessageInput placeholder="Type message here" />
            </MessageContainer>
          </MainContainer>
        </MinChatUiProvider>
      )}
    </div>
  );
}

export default ChatAssistant;
