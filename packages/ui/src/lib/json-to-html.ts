import { generateHTML, JSONContent } from "@tiptap/react";
import { baseExtensions } from "../components/rich-text-editor/extensions";

export const convertJsonToHtml = (json: JSONContent): string => {
  try {
    const content = typeof json === "string" ? JSON.parse(json) : json;
    return generateHTML(content, baseExtensions);
  } catch {
    console.log("error converting json to html");
    // TODO: log error to sentry
    return "";
  }
};
