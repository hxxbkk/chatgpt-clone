'use client';

import { useState } from 'react';
import { AutoResizingTextarea } from './AutoResizingTextarea';
import { Empty } from './Empty';
import { Message } from './Message';
import { ArrowUp } from 'lucide-react';

const MESSAGE_DUMMY = [
  { id: '1', content: '더미데이터1', role: 'user' },
  { id: '2', content: '더미데이터2', role: 'assistant' },
];

export function Chat() {
  const [value, setValue] = useState('');
  return (
    <div className="flex flex-col w-[80%] h-full mx-auto">
      {/* 채팅영역 */}
      <div className="flex-1">
        {MESSAGE_DUMMY.length === 0 ? (
          <Empty />
        ) : (
          <>
            {MESSAGE_DUMMY.map((message) => (
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
      <div className="pb-5">
        <form className="flex itmes-center justify-center gap-4">
          <AutoResizingTextarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button type="submit" size="icon">
            <ArrowUp />
          </button>
        </form>
      </div>
    </div>
  );
}
