'use client';
import { zodResolver } from '@hookform/resolvers/zod';
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@workspace/ui/components/tooltip';
import { Plus } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { workspaceSchema } from '@/app/schemas/workspace';

export const CreateWorkspace: React.FC = () => {
  const [open, setOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(workspaceSchema),
  });

  const onSubmit = (): void => {};

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button
              className='size-12 rounded-xl border-2 border-dashed border-muted-foreground/50 text-muted-foreground hover:border-muted-foreground hover:text-foreground hover:rounded-lg transition-all duration-200 cursor-pointer'
              variant='ghost'
            >
              <Plus className='size-5' />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent side='right'>
          <p>Create Workspace</p>
        </TooltipContent>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Create Workspace</DialogTitle>
            <DialogDescription>
              Create a new workspace to get started
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form className='space-y-8' onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder='My Workspace' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit'>Create Workspace</Button>
            </form>
          </Form>
        </DialogContent>
      </Tooltip>
    </Dialog>
  );
};
