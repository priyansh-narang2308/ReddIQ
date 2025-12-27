import React, { useState, useEffect } from "react";
import Header from "@/shared/common/header";
import { useFormData } from "@/shared/hooks/formData";
import Markdown from "react-markdown";
import { Clock, ArrowUpCircle, Sparkles, Quote } from "lucide-react";

interface CommentsProps {
  post: any;
  comment: any;
  onRemove: () => void;
}

const SkeletonComment = () => (
  <div className="bg-zinc-900/20 border border-zinc-800/50 rounded-xl p-5 animate-pulse space-y-3">
    <div className="flex items-center space-x-2">
      <div className="w-6 h-6 rounded-full bg-zinc-800"></div>
      <div className="w-24 h-3 bg-zinc-800 rounded-md"></div>
      <div className="w-12 h-2 bg-zinc-800/50 rounded-md"></div>
    </div>
    <div className="space-y-2">
      <div className="w-full h-4 bg-zinc-800 rounded-md"></div>
      <div className="w-5/6 h-4 bg-zinc-800 rounded-md"></div>
    </div>
    <div className="flex items-center space-x-4 pt-2">
      <div className="w-8 h-3 bg-zinc-800 rounded-md"></div>
    </div>
  </div>
);

const CommentsModal = ({ post, comment, onRemove }: CommentsProps) => {
  const { formData } = useFormData();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const commentData = [
    {
      id: 1,
      author: "u/tech_pioneer",
      comment:
        "This implementation of quantum neural networks is fascinating. The latency reductions mentioned in section 4 are particularly impressive.",
      score: 45,
      time: "1h ago",
      avatarColor: "bg-blue-500/20 text-blue-400",
    },
    {
      id: 2,
      author: "u/code_master",
      comment:
        "I've been testing similar architectures. Have you considered using a hybrid approach for the attention mechanism?",
      score: 32,
      time: "45m ago",
      avatarColor: "bg-orange-500/20 text-orange-400",
    },
    {
      id: 3,
      author: "u/design_guru",
      comment:
        "The visual representation in the modal is very clean. It really helps in parsing complex thread interactions quickly.",
      score: 28,
      time: "15m ago",
      avatarColor: "bg-emerald-500/20 text-emerald-400",
    },
  ];

  const summaryMarkdown = `# Thread Insights Summary
The discussion is highly technical, focusing on **performance metrics** and **architectural patterns**. Users are generally positive about the latest updates, specifically praising the lower latency.
- **Top Theme**: Strategic AI integration
- **Sentiment**: 84% Positive
- **Engagement**: High`;

  return (
    <div className="flex flex-col w-150 h-162.5 bg-zinc-950 rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden transition-all duration-500">
      <Header
        title="Comment Insights"
        count={loading ? 0 : commentData.length}
        onRemove={onRemove}
      />

      <div className="flex-1 overflow-y-auto custom-scrollbar relative">
        {loading ? (
          <div className="p-4 space-y-4 animate-in fade-in duration-500">
            <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-orange-500/0 via-orange-500 to-orange-500/0 animate-shimmer" />

            <div className="flex flex-col items-center justify-center py-6 space-y-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full border-2 border-orange-500/20 border-t-orange-500 animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-orange-500 animate-pulse" />
                </div>
              </div>
              <div className="text-center">
                <p className="text-zinc-100 font-bold tracking-tight">
                  Analyzing Comments
                </p>
                <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest mt-1">
                  AI Semantic Analysis Active
                </p>
              </div>
            </div>

            <div className="space-y-4 px-1 opacity-40">
              <SkeletonComment />
              <SkeletonComment />
              <SkeletonComment />
            </div>
          </div>
        ) : (
          <div className="flex flex-col animate-in slide-in-from-bottom-4 duration-500">
            <div className="p-5 bg-orange-500/5 border-b border-zinc-800/50 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="w-12 h-12 text-orange-500" />
              </div>
              <div
                className="prose prose-invert prose-sm max-w-none 
                prose-headings:text-orange-400 prose-headings:font-bold prose-headings:mb-2 prose-headings:mt-0
                prose-p:text-zinc-400 prose-li:text-zinc-400 prose-strong:text-zinc-200"
              >
                <Markdown>{summaryMarkdown}</Markdown>
              </div>
            </div>

            <div className="p-4 space-y-4">
              {commentData.map((item) => (
                <div
                  key={item.id}
                  className="group relative bg-zinc-900/40 hover:bg-zinc-900/80 border border-zinc-800 hover:border-orange-500/30 rounded-xl p-4 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-linear-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border border-zinc-700 ${item.avatarColor}`}
                        >
                          {item.author.charAt(2).toUpperCase()}
                        </div>
                        <span className="text-xs font-bold text-zinc-300 group-hover:text-zinc-100">
                          {item.author}
                        </span>
                        <span className="text-[10px] text-zinc-500 flex items-center">
                          <Clock className="w-2.5 h-2.5 mr-1" />
                          {item.time}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 text-orange-500/80 group-hover:text-orange-500">
                        <ArrowUpCircle className="w-3 h-3" />
                        <span className="text-[10px] font-bold">
                          {item.score}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-zinc-400 group-hover:text-zinc-300 leading-relaxed pl-8 border-l-2 border-zinc-800 group-hover:border-orange-500/20 ml-3">
                      {item.comment}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite linear;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #3f3f46;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #f97316;
        }
      `,
        }}
      />
    </div>
  );
};

export default CommentsModal;
