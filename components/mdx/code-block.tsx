"use client";

import { useCallback, useState } from "react";
import { Highlight, themes, type Language } from "prism-react-renderer";
import { Check, Copy, Terminal, Cpu } from "lucide-react";
import { useTheme } from "next-themes";

type CodeBlockProps = {
  code: string;
  language?: string;
  highlightedLines?: number[];
  showLineNumbers?: boolean;
  filename?: string;
  terminal?: boolean;
};

export function CodeBlock({
  code,
  language = "bash",
  highlightedLines = [],
  showLineNumbers = true,
  filename,
  terminal = false,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const { resolvedTheme } = useTheme();

  // Use built-in prism-react-renderer themes, driven by current app theme
  const isDarkMode = resolvedTheme === "dark";
  const theme = isDarkMode ? themes.dracula : themes.github;

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [code]);

  return (
    <div className="group relative my-6 overflow-hidden rounded-xl border border-border/50 bg-card shadow-md transition-all duration-300 hover:shadow-lg">
      {/* Header with terminal-like appearance */}
      <div className="flex h-12 items-center justify-between border-b border-border/30 bg-card px-4 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          {terminal && (
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-500/80"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500/80"></div>
              <div className="h-3 w-3 rounded-full bg-green-500/80"></div>
            </div>
          )}
          <div className="flex items-center gap-2">
            {terminal ? (
              <Terminal className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Cpu className="h-4 w-4 text-muted-foreground" />
            )}
            <span className="inline-flex h-6 items-center rounded-md bg-muted px-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              {language}
            </span>
            {filename && (
              <span className="text-xs font-mono text-muted-foreground">
                {filename}
              </span>
            )}
          </div>
        </div>
        <button
          onClick={handleCopy}
          className="inline-flex h-7 items-center justify-center gap-1.5 rounded-md bg-muted px-2.5 text-xs font-medium text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          aria-label={copied ? "Copied!" : "Copy code"}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code content */}
      <div className="relative">
        {/* Subtle scanline effect for hacker aesthetic */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/5 pointer-events-none"></div>
        
        <Highlight
          theme={theme}
          code={code.trimEnd()}
          language={language as Language}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={`${className} m-0 max-h-[520px] overflow-auto p-4 text-xs leading-relaxed font-mono`}
              style={style}
              dir="ltr"
            >
              {tokens.map((line, i) => {
                const lineNumber = i + 1;
                const isHighlighted = highlightedLines.includes(lineNumber);
                return (
                  <div
                    key={i}
                    {...getLineProps({ line })}
                    className={`flex gap-4 transition-colors duration-200 ${
                      isHighlighted 
                        ? isDarkMode 
                          ? "bg-purple-500/20" 
                          : "bg-blue-500/20"
                        : "bg-transparent"
                    }`}
                  >
                    {showLineNumbers && (
                      <span 
                        className={`select-none text-right text-[10px] w-6 ${
                          isDarkMode ? "text-gray-500" : "text-gray-400"
                        }`}
                      >
                        {lineNumber}
                      </span>
                    )}
                    <span className="flex-1">
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token, key })} />
                      ))}
                    </span>
                  </div>
                );
              })}
            </pre>
          )}
        </Highlight>
      </div>
      
      {/* Subtle terminal-like footer */}
      {terminal && (
        <div className="flex items-center h-6 bg-card border-t border-border/30 px-4">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-muted-foreground">$</span>
            <span className="h-3 w-1.5 bg-foreground animate-pulse"></span>
          </div>
        </div>
      )}
    </div>
  );
}