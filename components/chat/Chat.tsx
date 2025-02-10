'use client';

import { useEffect, useRef, useState } from 'react';
import { useChat } from 'ai/react';
import { AutoResizingTextarea } from './AutoResizingTextarea';
import { Empty } from './Empty';
import { Message } from './Message';
import { Button } from '../ui/button';
import { ArrowUp } from 'lucide-react';
import { DUMMY_LONG_TEXT } from '@/constants/dummy';
import { useModelStore } from '@/store/model';
import { useParams, useRouter } from 'next/navigation';
import { addMessages, createConversation } from '@/actions/conversation';

import { CHAT_ROUTES } from '@/constants/routes';

const MESSAGE_DUMMY = [
  { id: '1', content: '더미데이터1', role: 'user' },
  { id: '2', content: '더미데이터2', role: 'assistant' },
  { id: '3', content: '더미데이터3', role: 'user' },
  { id: '4', content: DUMMY_LONG_TEXT, role: 'assistant' },
];

export function Chat() {
  const router = useRouter();
  const params = useParams<{ conversationId: string }>();
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    onFinish: async (message) => {
      // param -> conversationId가 없으면 새로운 대화 페이지
      if (!params.conversationId) {
        //1.create conversation
        const conversation = await createConversation(input);
        //2. add message
        await addMessages(conversation.id, input, message.content);

        router.push(`${CHAT_ROUTES.CONVERSATIONS}/${conversation.id}`);
      } else {
        // param -> conversationId가 있으면 기존 대화 페이지
        //1. add messages
      }
    },
  });
  const model = useModelStore((state) => state.model);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex flex-col w-[80%] h-full mx-auto">
      {/* 채팅영역 */}
      <div className="flex-1">
        {messages.length === 0 ? (
          <Empty />
        ) : (
          <>
            {messages.map((message) => (
              <Message
                key={message.id}
                name={'user'}
                content={message.content}
                role={message.role}
              />
            ))}
          </>
        )}
      </div>

      {/* input영역 */}
      <div className="pb-5 sticky bottom-0 bg-white">
        <form
          className="flex items-center justify-center gap-4"
          onSubmit={(e) => handleSubmit(e, { data: model })}
        >
          <AutoResizingTextarea value={input} onChange={handleInputChange} />
          <Button type="submit" size="icon">
            <ArrowUp />
          </Button>
        </form>
      </div>
      <div ref={scrollRef} />
    </div>
  );
}
