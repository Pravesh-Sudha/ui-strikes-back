import React, { useState, useRef } from 'react';
import {
  TamboProvider,
  useTamboThread,
  useTamboThreadInput
} from '@tambo-ai/react';

import { tamboConfig } from './tambo/tambo.config';
import {
  Activity,
  TrendingUp,
  Sparkles,
  Code,
  Cpu,
  Globe,
  Zap,
  Briefcase
} from 'lucide-react';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from './utils/utils';

const QUICK_ACTIONS = [
  { label: "📊 Visualize Skills", prompt: "Visualize my skill balance based on my resume." },
  { label: "📉 Check Decay", prompt: "Show me a timeline of my skill decay." },
  { label: "⚠️ Risk Audit", prompt: "Do I have any major career risks in my stack?" },
  { label: "🚀 Upgrade Path", prompt: "Suggest a high-impact skill upgrade." }
];

function AnalysisView() {
  const { thread } = useTamboThread();
  const { value, setValue, submit, isPending } = useTamboThreadInput();

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isParsing, setIsParsing] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsParsing(true);
      let text = "";

      if (file.type === 'application/pdf') {
        const { extractTextFromPDF } = await import('./utils/pdf-parser');
        text = await extractTextFromPDF(file);
      } else {
        text = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (event) =>
            resolve(event.target?.result as string);
          reader.onerror = reject;
          reader.readAsText(file);
        });
      }

      setValue(prev => {
        const separator = prev ? "\n\n" : "";
        return (
          prev +
          separator +
          `[Uploaded Resume: ${file.name}]\n${text}\n[End of Upload]\n`
        );
      });
    } catch (err) {
      console.error(err);
      alert("Failed to read file");
    } finally {
      setIsParsing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    submit();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 min-h-screen flex flex-col pb-40">

      {/* Header */}
      <header className="text-center space-y-4 pt-10 pb-6">
        <div className="inline-flex p-3 rounded-full bg-primary/5 mb-4">
          <Sparkles className="w-8 h-8 text-primary" />
        </div>

        <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">
          SkillDebt.ai
        </h1>

        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Analyze your technical skill debt, visualize decay, and find your optimal upgrade path.
        </p>
      </header>

      <div className="flex-1 space-y-8">

        {/* Landing Upload */}
        {thread.messages.length === 0 && (
          <div className="space-y-6">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="text-center py-12 border-2 border-dashed rounded-xl bg-muted/20 cursor-pointer hover:bg-muted/30 transition"
            >
              <div className="flex flex-col items-center gap-2">
                {isParsing ? (
                  <Activity className="w-8 h-8 animate-spin text-primary" />
                ) : (
                  <Sparkles className="w-8 h-8 text-muted-foreground" />
                )}

                <p className="text-lg font-medium">
                  {isParsing ? "Reading file..." : "Upload Resume to Start"}
                </p>

                <p className="text-sm text-muted-foreground">
                  Click to upload PDF/Text or type below
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {QUICK_ACTIONS.map((a, i) => (
                <button
                  key={i}
                  onClick={() => setValue(a.prompt)}
                  className="px-4 py-2 rounded-full bg-white border shadow-sm hover:border-primary/50 text-sm"
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        {thread.messages.length > 0 && (
          <div className="space-y-8">
            {thread.messages.map(msg => (
              <div
                key={msg.id}
                className={cn(
                  "flex flex-col gap-4 p-6 rounded-xl animate-in fade-in slide-in-from-bottom-4",
                  msg.role === "user"
                    ? "bg-muted/30 border ml-12"
                    : "bg-white border shadow-sm mr-4"
                )}
              >
                <div className="prose max-w-none">
                  {Array.isArray(msg.content) ? (
                    msg.content.map((part, i) =>
                      part.type === "text" ? (
                        <ReactMarkdown key={i} remarkPlugins={[remarkGfm]}>
                          {part.text}
                        </ReactMarkdown>
                      ) : null
                    )
                  ) : (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {String(msg.content)}
                    </ReactMarkdown>
                  )}
                </div>

                {msg.renderedComponent && (
                  <div className="mt-4 animate-in zoom-in-95">
                    {msg.renderedComponent}
                  </div>
                )}
              </div>
            ))}

            {isPending && (
              <div className="flex items-center gap-2 text-muted-foreground p-4">
                <Activity className="w-4 h-4 animate-spin" />
                Analyzing skill portfolio...
              </div>
            )}
          </div>
        )}
      </div>

      {/* Floating Background Icons */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <Code className="absolute top-[10%] left-[5%] w-24 h-24 text-primary/5" />
        <Cpu className="absolute top-[20%] right-[10%] w-32 h-32 text-primary/5" />
        <Globe className="absolute bottom-[30%] left-[15%] w-20 h-20 text-primary/5" />
        <Zap className="absolute bottom-[10%] right-[20%] w-16 h-16 text-primary/5" />
        <Briefcase className="absolute top-[40%] left-[40%] w-40 h-40 text-primary/3" />
      </div>

      {/* Input Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-6 backdrop-blur-md bg-background/80 z-10">
        <div className="max-w-4xl mx-auto space-y-4">

          {thread.messages.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center">
              {QUICK_ACTIONS.map((a, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setValue(a.prompt);
                    setTimeout(submit, 0);
                  }}
                  className="px-3 py-1.5 rounded-full bg-white border shadow-sm text-xs"
                >
                  {a.label}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={handleAnalyze}
            className="relative flex items-center bg-card border rounded-xl p-1 shadow-xl"
          >
            <textarea
              ref={textareaRef}
              value={value}
              onChange={e => setValue(e.target.value)}
              placeholder="Paste resume, portfolio, or describe your stack..."
              className="w-full min-h-[80px] p-4 pr-32 resize-none rounded-xl outline-none"
              onKeyDown={e => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  submit();
                }
              }}
            />

            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept=".txt,.md,.json,.pdf"
              onChange={handleFileUpload}
            />

            <div className="absolute bottom-4 right-4">
              <button
                type="submit"
                disabled={isPending || !value.trim() || isParsing}
                className="bg-primary text-primary-foreground px-6 py-2 rounded-full flex items-center gap-2 disabled:opacity-50"
              >
                {isPending ? (
                  <Activity className="w-4 h-4 animate-spin" />
                ) : (
                  <TrendingUp className="w-4 h-4" />
                )}
                Analyze
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <TamboProvider
      components={tamboConfig.components}
      apiKey={import.meta.env.VITE_TAMBO_API_KEY || "demo-key"}
    >
      <div className="min-h-screen bg-background text-foreground font-sans">
        <AnalysisView />
      </div>
    </TamboProvider>
  );
}

export default App;
