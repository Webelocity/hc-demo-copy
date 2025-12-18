import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// If you don't need raw HTML in markdown, remove these:
// import rehypeSanitize from "rehype-sanitize";
// import rehypeRaw from "rehype-raw";

function normalizeMarkdown(input: unknown): string {
    if (typeof input !== "string") return "";

    let md = input;

    // Remove one pair of wrapping quotes if Strapi stored it like: "...."
    if (md.length >= 2 && md.startsWith('"') && md.endsWith('"')) {
        md = md.slice(1, -1);
    }

    // Convert escaped newlines to real newlines (safe if they’re already real)
    md = md.replace(/\\r\\n/g, "\n").replace(/\\n/g, "\n").replace(/\r\n/g, "\n");

    return md.trim();
}

const components: Components = {
    h1: ({ children, ...props }) => (
        <h1 className="mt-8 mb-4 text-3xl font-bold leading-tight" {...props}>
            {children}
        </h1>
    ),
    h2: ({ children, ...props }) => (
        <h2 className="mt-7 mb-3 text-2xl font-semibold leading-snug" {...props}>
            {children}
        </h2>
    ),
    h3: ({ children, ...props }) => (
        <h3 className="mt-6 mb-3 text-xl font-semibold leading-snug" {...props}>
            {children}
        </h3>
    ),
    h4: ({ children, ...props }) => (
        <h4 className="mt-5 mb-2 text-lg font-semibold leading-snug" {...props}>
            {children}
        </h4>
    ),
    h5: ({ children, ...props }) => (
        <h5 className="mt-4 mb-2 text-base font-semibold leading-snug" {...props}>
            {children}
        </h5>
    ),
    h6: ({ children, ...props }) => (
        <h6 className="mt-3 mb-2 text-sm font-semibold uppercase tracking-wide text-slate-600" {...props}>
            {children}
        </h6>
    ),
    p: ({ children, ...props }) => (
        <p className="my-3 leading-relaxed text-slate-800" {...props}>
            {children}
        </p>
    ),
    a: ({ children, ...props }) => (
        <a
            className="text-blue-600 underline underline-offset-2 transition hover:text-blue-700"
            target="_blank"
            rel="noreferrer"
            {...props}
        >
            {children}
        </a>
    ),
    strong: ({ children, ...props }) => (
        <strong className="font-semibold text-slate-900" {...props}>
            {children}
        </strong>
    ),
    em: ({ children, ...props }) => (
        <em className="italic text-slate-800" {...props}>
            {children}
        </em>
    ),
    del: ({ children, ...props }) => (
        <del className="text-slate-500 line-through" {...props}>
            {children}
        </del>
    ),
    blockquote: ({ children, ...props }) => (
        <blockquote className="my-4 border-l-4 border-slate-200 bg-slate-50 px-4 py-3 text-slate-700" {...props}>
            {children}
        </blockquote>
    ),
    hr: (props) => <hr className="my-8 border-slate-200" {...props} />,
    ul: ({ children, ...props }) => (
        <ul className="my-3 list-disc space-y-2 pl-6" {...props}>
            {children}
        </ul>
    ),
    ol: ({ children, ...props }) => (
        <ol className="my-3 list-decimal space-y-2 pl-6" {...props}>
            {children}
        </ol>
    ),
    li: ({ children, ...props }) => (
        <li className="leading-relaxed" {...props}>
            {children}
        </li>
    ),
    code: ({ inline, children, className, ...props }: any) => {
        if (inline) {
            return (
                <code
                    className="rounded bg-slate-100 px-1.5 py-0.5 text-sm font-mono text-slate-900"
                    {...props}
                >
                    {children}
                </code>
            );
        }

        return (
            <pre className="my-4 overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">
                <code className={className} {...props}>
                    {children}
                </code>
            </pre>
        );
    },
    table: ({ children, ...props }) => (
        <div className="my-4 overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm text-slate-800" {...props}>
                {children}
            </table>
        </div>
    ),
    thead: ({ children, ...props }) => (
        <thead className="bg-slate-100 text-slate-900" {...props}>
            {children}
        </thead>
    ),
    tbody: ({ children, ...props }) => <tbody {...props}>{children}</tbody>,
    tr: ({ children, ...props }) => (
        <tr className="border-b border-slate-200 last:border-0" {...props}>
            {children}
        </tr>
    ),
    th: ({ children, ...props }) => (
        <th className="px-3 py-2 font-semibold" {...props}>
            {children}
        </th>
    ),
    td: ({ children, ...props }) => (
        <td className="px-3 py-2 align-top" {...props}>
            {children}
        </td>
    ),
    img: ({ alt, ...props }) => (
        <img
            alt={alt ?? ""}
            loading="lazy"
            className="my-4 max-h-96 w-auto max-w-full rounded-lg object-contain"
            {...props}
        />
    ),
};

export function MarkdownView({ markdown }: { markdown: string }) {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            // If you truly need inline HTML, use:
            // rehypePlugins={[rehypeRaw, rehypeSanitize]}
            components={components}
        >
            {normalizeMarkdown(markdown)}
        </ReactMarkdown>
    );
}
