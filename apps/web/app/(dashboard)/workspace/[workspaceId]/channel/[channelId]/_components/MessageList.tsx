/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Button } from '@workspace/ui/components/button';
import { useParams } from 'next/navigation';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import { orpc } from '@/lib/orpc';

import { MessageItem } from './message/MessageItem';

const ARRAY_LAST_ITEM_INDEX_OFFSET = 1;
const SCROLL_THRESHOLD = 80;

export const MessageList: React.FC = () => {
  const { channelId } = useParams<{ channelId: string }>();
  const [hasInitialScrolled, setHasInitialScrolled] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const lastItemIdRef = useRef<string | undefined>(undefined);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [newMessages, setNewMessages] = useState(false);

  const infiniteOptions = orpc.message.list.infiniteOptions({
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: undefined,
    input: (pageParam: string | undefined) => ({
      channelId: channelId!,
      cursor: pageParam,
      limit: 12,
    }),
    select: (data) => ({
      pageParams: [...data.pageParams].reverse(),
      pages: [...data.pages]
        .map((p) => ({
          ...p,
          items: [...p.items].reverse(),
        }))
        .reverse(),
    }),
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    isFetching,
  } = useInfiniteQuery({
    ...infiniteOptions,
    refetchOnWindowFocus: false,
    staleTime: 30_000,
  });

  useEffect(() => {
    if (!hasInitialScrolled && data?.pages.length) {
      const el = scrollRef.current;

      if (el) {
        el.scrollTop = el.scrollHeight;
        setHasInitialScrolled(true);
        setIsAtBottom(true);
      }
    }
  }, [hasInitialScrolled, data?.pages.length]);

  const isNearBottom = (el: HTMLDivElement): boolean =>
    el.scrollHeight - el.scrollTop - el.clientHeight <= SCROLL_THRESHOLD;

  const handleScroll = (): void => {
    const el = scrollRef.current;

    if (!el) return;

    if (el.scrollTop <= SCROLL_THRESHOLD && hasNextPage && !isFetching) {
      const prevScrollHeight = el.scrollHeight;
      const prevScrollTop = el.scrollTop;

      fetchNextPage().then(() => {
        const newScrollHeight = el.scrollHeight;
        el.scrollTop = newScrollHeight - prevScrollHeight + prevScrollTop;
      });
    }

    setIsAtBottom(isNearBottom(el));
  };

  const items = useMemo(
    () => data?.pages.flatMap((p) => p.items) ?? [],
    [data],
  );

  useEffect(() => {
    if (!items.length) {
      return;
    }

    const lastId = items[items.length - ARRAY_LAST_ITEM_INDEX_OFFSET]?.id;
    const prevLastId = lastItemIdRef.current;

    const el = scrollRef.current;

    if (prevLastId && lastId !== prevLastId) {
      if (el && isNearBottom(el)) {
        requestAnimationFrame(() => {
          el.scrollTop = el.scrollHeight;
        });

        setNewMessages(false);
        setIsAtBottom(true);
      } else {
        setNewMessages(true);
      }
    }

    lastItemIdRef.current = lastId;
  }, [items]);

  const scrollToBottom = (): void => {
    const el = scrollRef.current;

    if (!el) return;

    el.scrollTop = el.scrollHeight;
    setNewMessages(false);
    setIsAtBottom(true);
  };

  return (
    <div className='relative h-full'>
      <div
        className='h-full overflow-y-auto px-4'
        onScroll={handleScroll}
        ref={scrollRef}
      >
        {items.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
        <div ref={bottomRef}></div>
      </div>

      {newMessages && !isAtBottom ? (
        <Button
          className='absolute bottom-4 right-8 rounded-full'
          onClick={scrollToBottom}
          type='button'
        >
          New Messages
        </Button>
      ) : null}
    </div>
  );
};
