import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom';
import chats from '../../../../../data/chats';
import GroupListItem from './GroupListItem';

export default function GroupList() {
  const chatRef = useRef(null);
  let { id } = useParams();

  const scrollToChat = () => {
    chatRef.current?.scrollIntoView();
  };

  useEffect(() => {
    scrollToChat();
  }, []);

  return (
    <div className="w-full h-full whitespace-normal overflow-auto scrollbar px-2 flex flex-col">
      {chats.map((chat) => (
        <GroupListItem
          key={chat.id}
          ref={chat.id === +id ? chatRef : null}
          group={chat}
        />
      ))}
    </div>
  );
}
