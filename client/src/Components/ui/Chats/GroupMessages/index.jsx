import React from 'react'
import GroupHeader from './GroupHeader';
import Messages from './Messages';
import SendMessage from './SendMessage';

export default function GroupMessages() {
  return (
    <div className={"w-full h-full flex flex-col justify-start"}>
      <GroupHeader />
      <Messages />
      <SendMessage />
    </div>
  );
}
