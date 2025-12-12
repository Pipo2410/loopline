'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { isDefinedError } from '@orpc/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@workspace/ui/components/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@workspace/ui/components/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@workspace/ui/components/form';
import { Input } from '@workspace/ui/components/input';
import { Plus } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import {
  channelNameSchema,
  ChannelSchemaNameType,
  transformChannelName,
} from '@/app/schemas/channel';
import { orpc } from '@/lib/orpc';

export const CreateNewChannel: React.FC = () => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm({
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(channelNameSchema),
  });

  const createChannelMutation = useMutation(
    orpc.channel.create.mutationOptions({
      onError: (error) => {
        if (isDefinedError(error)) {
          toast.error(error.message);
          return;
        }

        toast.error('Failed to create channel. Please try again.');
      },
      onSuccess: (newChannel) => {
        toast.success(`Channel ${newChannel.name} created successfully`);
        queryClient.invalidateQueries({
          queryKey: orpc.channel.list.queryKey(),
        });

        form.reset();
        setOpen(false);
      },
    }),
  );

  const onSubmit = (values: ChannelSchemaNameType): void => {
    createChannelMutation.mutate({
      name: values.name,
    });
  };

  const watchedName = form.watch('name');
  const transformedName = watchedName ? transformChannelName(watchedName) : '';

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button className='w-full' variant='outline'>
          <Plus className='size-4' />
          New Channel
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>New Channel</DialogTitle>
          <DialogDescription>
            Create a new channel to get started.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='My Channel' {...field} />
                  </FormControl>
                  {transformedName && transformedName !== watchedName && (
                    <p className='text-sm text-muted-foreground'>
                      Will be created as:{' '}
                      <code className='bg-muted px-1 py-0.5 rounded text-xs'>
                        {transformedName}
                      </code>
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={createChannelMutation.isPending} type='submit'>
              {createChannelMutation.isPending
                ? 'Creating...'
                : 'Create new Channel'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
