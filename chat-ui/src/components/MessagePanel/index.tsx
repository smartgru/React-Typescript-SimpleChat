import React, { useMemo } from "react";
import moment from "moment";

import { IMessage } from "../../interfaces";
import { MESSAGE_TYPE } from "../../constants";
import "./style.css";

interface MessageListProps {
  messageList: IMessage[];
  sId: string;
}

const MessagePanel = ({ messageList, sId }: MessageListProps) => {
  // Prevent re-render when typing message
  const messages = useMemo(() => messageList, [messageList]);

  const renderMessage = (message: IMessage) => {
    if (message.type === MESSAGE_TYPE.NOTIF) {
      return (
        <div className="notif">
          <p className="subtitle">{moment(message.time).format("hh:mm A")}</p>
          <p>{message.content}</p>
        </div>
      );
    }

    if (sId === message.sId) {
      return (
        <div className="own">
          <p className="subtitle">{moment(message.time).format("hh:mm A")}</p>
          <p className="own">{message.content}</p>
        </div>
      );
    }
    return (
      <div className="other">
        <p className="subtitle">{message.from} {moment(message.time).format("hh:mm A")}</p>
        <p>{message.content}</p>
      </div>
    );
  };

  return (
    <div className="message-panel">
      {messages.map((message) => renderMessage(message))}
    </div>
  );
};

export default MessagePanel;
