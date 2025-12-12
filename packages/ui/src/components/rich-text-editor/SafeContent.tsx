import { JSONContent } from "@tiptap/react";
import { convertJsonToHtml } from "@workspace/ui/lib/json-to-html";
import React from "react";
import DOMPurify from "dompurify";

import parse from "html-react-parser";

type SafeContentProps = {
  content: JSONContent;
  className?: string;
};

export const SafeContent: React.FC<SafeContentProps> = ({
  content,
  className,
}) => {
  const html = convertJsonToHtml(content);

  const clear = DOMPurify.sanitize(html);

  return <div className={className}>{parse(clear)}</div>;
};
