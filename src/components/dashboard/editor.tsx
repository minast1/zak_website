"use client";
import React, { forwardRef } from "react";
import RichTextEditor, { type Editor } from "reactjs-tiptap-editor";
import {
  BaseKit,
  Bold,
  Italic,
  BulletList,
  Heading,
  TextAlign,
  FormatPainter,
  Underline,
  Emoji,
  OrderedList,
  Indent,
  Link,
  LineHeight,
  Highlight,
  FontFamily,
  SubAndSuperScript,
  Color,
  Blockquote,
} from "reactjs-tiptap-editor/extension-bundle";
// Import CSS
import "reactjs-tiptap-editor/style.css";

const extensions = [
  BaseKit.configure({
    placeholder: {
      showOnlyCurrent: true,
      placeholder: "Write something creative...",
    },
  }),
  Bold,
  Heading,
  Italic,
  LineHeight,
  Indent,
  Emoji,
  BulletList,
  TextAlign,
  Underline,
  OrderedList,
  Link,
  SubAndSuperScript,
  Highlight,
  FormatPainter,
  FontFamily,
  Color,
  Blockquote,
];

type Props = {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
};

const RTEditor = ({ content, setContent }: Props) => {
  const onChangeContent = (value: string) => {
    setContent(value);
  };
  return (
    <RichTextEditor
      extensions={extensions}
      content={content}
      onChangeContent={onChangeContent}
      output="html"
      removeDefaultWrapper={true}
    />
  );
};

export default RTEditor;
