'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@workspace/ui/components/form';
// import { RichTextEditor } from '@workspace/ui/components/rich-text-editor/editor'
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import {
  CreateMessageSchema,
  createMessageSchema,
} from '@/app/schemas/message';
import { orpc } from '@/lib/orpc';

import { MessageComposer } from './MessageComposer';

interface iAppProps {
  channelId: string;
}

export const MessageInputForm: React.FC<iAppProps> = ({ channelId }) => {
  const queryClient = useQueryClient();
  const form = useForm({
    defaultValues: {
      channelId,
      content: '',
    },
    resolver: zodResolver(createMessageSchema),
  });

  const createMessageMutation = useMutation(
    orpc.message.create.mutationOptions({
      onError: () => toast.error('Something went wrong'),
      onSuccess: () => {
        form.reset();
        queryClient.invalidateQueries({
          queryKey: orpc.message.list.queryKey({ input: { channelId } }),
        });
        return toast.success('Message sent successfully');
      },
    }),
  );

  const onSubmit = (data: CreateMessageSchema): void => {
    createMessageMutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='content'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <MessageComposer
                  isSubmitting={createMessageMutation.isPending}
                  onChange={field.onChange}
                  onSubmit={() => onSubmit(form.getValues())}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
