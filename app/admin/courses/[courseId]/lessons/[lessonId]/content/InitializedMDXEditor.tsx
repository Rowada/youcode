"use client";
// InitializedMDXEditor.tsx
import {
  BoldItalicUnderlineToggles,
  ChangeCodeMirrorLanguage,
  codeBlockPlugin,
  codeMirrorPlugin,
  ConditionalContents,
  headingsPlugin,
  InsertCodeBlock,
  listsPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  quotePlugin,
  ShowSandpackInfo,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
  type MDXEditorProps,
} from "@mdxeditor/editor";

import "@mdxeditor/editor/style.css";
import styles from "./mdx-editor-theme.module.css";

export default function InitializedMDXEditor({ ...props }: MDXEditorProps) {
  return (
    <MDXEditor
      className={styles.theme}
      contentEditableClassName="prose dark:prose-invert"
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: "js" }),
        codeMirrorPlugin({
          codeBlockLanguages: { js: "javascript", css: "CSS" },
        }),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),

        toolbarPlugin({
          toolbarContents: () => (
            <ConditionalContents
              options={[
                {
                  when: (editor) => editor?.editorType === "codeblock",
                  contents: () => <ChangeCodeMirrorLanguage />,
                },
                {
                  when: (editor) => editor?.editorType === "sandpack",
                  contents: () => <ShowSandpackInfo />,
                },
                {
                  fallback: () => (
                    <>
                      <UndoRedo />
                      <BoldItalicUnderlineToggles />
                      <InsertCodeBlock />
                    </>
                  ),
                },
              ]}
            />
          ),
        }),
      ]}
      {...props}
    />
  );
}
