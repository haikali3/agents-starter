import { marked } from "marked";
import type { Tokens } from "marked";
import { memo, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function parseMarkdownIntoBlocks(markdown: string): string[] {
  const tokens: TokensList = marked.lexer(markdown);
  return tokens.map((token: Tokens.Generic) => token.raw);
}

type TokensList = Array<Tokens.Generic & { raw: string }>;

const MemoizedMarkdownBlock = memo(
  ({ content, streaming }: { content: string; streaming?: boolean }) => (
    <div className={`markdown-body ${streaming ? "animate-pulse" : ""}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  ),
  (prevProps, nextProps) =>
    prevProps.content === nextProps.content &&
    prevProps.streaming === nextProps.streaming
);

MemoizedMarkdownBlock.displayName = "MemoizedMarkdownBlock";

export const MemoizedMarkdown = memo(
  ({
    content,
    id,
    streaming,
  }: {
    content: string;
    id: string;
    streaming?: boolean;
  }) => {
    const blocks = useMemo(() => parseMarkdownIntoBlocks(content), [content]);
    return blocks.map((block, index) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: immutable index
      <MemoizedMarkdownBlock
        content={block}
        key={`${id}-block_${index}`}
        streaming={streaming}
      />
    ));
  }
);

MemoizedMarkdown.displayName = "MemoizedMarkdown";
