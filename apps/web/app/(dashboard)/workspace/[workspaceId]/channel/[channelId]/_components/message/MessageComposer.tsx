import { Button } from '@workspace/ui/components/button';
import { RichTextEditor } from '@workspace/ui/components/rich-text-editor/editor';
import { ImageIcon, Send } from 'lucide-react';
import React from 'react';

type MessageComposerProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
};

export const MessageComposer: React.FC<MessageComposerProps> = ({
  value,
  onChange,
  onSubmit,
  isSubmitting,
}) => (
  <>
    <RichTextEditor
      field={{
        onChange,
        value,
      }}
      footerLeft={
        <Button size='sm' type='button' variant='outline'>
          <ImageIcon className='size-4 mr-1' />
          Attach
        </Button>
      }
      sendButton={
        <Button
          disabled={isSubmitting}
          onClick={onSubmit}
          size='sm'
          type='button'
        >
          <Send className='size-4 mr-1' />
          {isSubmitting ? 'Sending...' : 'Send'}
        </Button>
      }
    />
  </>
);
