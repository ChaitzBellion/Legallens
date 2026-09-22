import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  MessageSquare,
  Sparkles,
  Tag,
  Loader2,
  ExternalLink,
  Bot,
  User,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import type { QnAMessage } from '../types.js';

interface AskLegalLensProps {
  documentText: string;
  onAskQuestion: (question: string, history: QnAMessage[]) => Promise<{ answer: string; source: string; foundInDocument: boolean }>;
  onSelectCitation?: (source: string) => void;
}

const SAMPLE_QUESTIONS = [
  'What is my notice period?',
  'Can I resign during probation?',
  'Does this agreement mention a non-compete?',
  'What happens if the company terminates my employment?',
  'Who owns intellectual property created during employment?',
  'Is there a relocation or remote work clause?',
];

export const AskLegalLens: React.FC<AskLegalLensProps> = ({
  documentText,
  onAskQuestion,
  onSelectCitation,
}) => {
  const [messages, setMessages] = useState<QnAMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Hello! I'm LegalLens. Ask me any question about your uploaded document. Every answer is strictly grounded in the contract text with exact section citations.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isAnswering, setIsAnswering] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isAnswering]);

  const handleSend = async (questionText?: string) => {
    const q = (questionText || inputValue).trim();
    if (!q || isAnswering) return;

    const userMessage: QnAMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsAnswering(true);

    try {
      const response = await onAskQuestion(q, messages);
      const assistantMessage: QnAMessage = {
        id: `assistant_${Date.now()}`,
        sender: 'assistant',
        text: response.answer,
        source: response.source,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      const errorMessage: QnAMessage = {
        id: `err_${Date.now()}`,
        sender: 'assistant',
        text: err?.message || "Sorry, I couldn't answer that question right now. Please try again.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsAnswering(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col h-[640px]" id="ask-legallens-chat">
      {/* Header */}
      <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-slate-800 text-amber-400 flex items-center justify-center border border-slate-700">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-base text-white flex items-center gap-2">
              <span>Ask LegalLens</span>
              <span className="text-[10px] font-sans font-semibold uppercase bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">
                Document-Grounded
              </span>
            </h3>
            <p className="text-xs text-slate-400">Strictly answers from your uploaded document with source citations.</p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Prompt injection defended</span>
        </div>
      </div>

      {/* Suggested Quick Questions */}
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-2.5 overflow-x-auto">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500 font-medium flex-shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-600" />
            Try asking:
          </span>
          <div className="flex items-center gap-2 flex-nowrap">
            {SAMPLE_QUESTIONS.map((sampleQ, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(sampleQ)}
                disabled={isAnswering}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white hover:bg-slate-200 text-slate-700 border border-slate-300 text-xs transition-colors cursor-pointer disabled:opacity-50"
              >
                {sampleQ}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4">
        {messages.map((msg) => {
          const isAssistant = msg.sender === 'assistant';

          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-3xl ${isAssistant ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs ${
                  isAssistant ? 'bg-slate-900 text-amber-400' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {isAssistant ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>

              <div
                className={`rounded-2xl p-4 space-y-2 text-sm leading-relaxed ${
                  isAssistant
                    ? 'bg-slate-50 border border-slate-200 text-slate-900 shadow-2xs'
                    : 'bg-slate-900 text-white shadow-xs'
                }`}
              >
                <div className="whitespace-pre-line">{msg.text}</div>

                {isAssistant && msg.source && msg.source !== 'Not specified' && msg.source !== 'Not mentioned in document' && (
                  <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs">
                    <button
                      onClick={() => onSelectCitation?.(msg.source!)}
                      className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-slate-700 hover:text-slate-950 bg-white hover:bg-slate-100 px-2 py-0.5 rounded border border-slate-300 transition-colors"
                      title="Jump to source in document"
                    >
                      <Tag className="w-3 h-3 text-slate-500" />
                      <span>Source: {msg.source}</span>
                    </button>
                    <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isAnswering && (
          <div className="flex gap-3 max-w-2xl mr-auto">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center flex-shrink-0 text-xs">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-600 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-amber-600" />
              <span>Checking document and citing exact sections...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="p-4 border-t border-slate-200 bg-white">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            id="chat-question-input"
            type="text"
            placeholder="Ask a question about this document (e.g., 'What is my notice period?')..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isAnswering}
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 disabled:bg-slate-50"
          />
          <button
            id="chat-send-btn"
            type="submit"
            disabled={!inputValue.trim() || isAnswering}
            className="px-4 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5 text-sm font-medium"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Ask</span>
          </button>
        </form>
      </div>
    </div>
  );
};
