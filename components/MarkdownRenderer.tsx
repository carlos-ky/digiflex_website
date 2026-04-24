'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <article className="prose prose-neutral max-w-none
      prose-headings:font-serif
      prose-h1:text-5xl prose-h1:font-bold prose-h1:text-[#0E0E0E] prose-h1:tracking-tight prose-h1:mb-8
      prose-h2:text-2xl prose-h2:font-bold prose-h2:text-[#0E0E0E] prose-h2:mt-16 prose-h2:mb-4 prose-h2:border-t prose-h2:border-[#E8E6E0] prose-h2:pt-8
      prose-h3:text-lg prose-h3:font-semibold prose-h3:text-[#0E0E0E] prose-h3:mt-8 prose-h3:mb-3
      prose-p:text-[#0E0E0E] prose-p:leading-relaxed prose-p:text-justify
      prose-a:text-[#0E0E0E] prose-a:underline prose-a:underline-offset-2 prose-a:font-medium
      prose-strong:text-[#0E0E0E] prose-strong:font-semibold
      prose-ul:text-[#0E0E0E] prose-li:marker:text-[#4A4A4A]
      prose-blockquote:border-l-4 prose-blockquote:border-[#0E0E0E] prose-blockquote:bg-white
      prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:not-italic
      prose-blockquote:text-[#4A4A4A] prose-blockquote:my-8 prose-blockquote:rounded-sm
      prose-hr:border-[#E8E6E0] prose-hr:my-12">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </article>
  );
}