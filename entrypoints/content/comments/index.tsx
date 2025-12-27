import React, { useState, useEffect } from "react";
import Header from "@/shared/common/header";
import { useFormData } from "@/shared/hooks/formData";
import Markdown from "react-markdown";
import { Clock, ArrowUpCircle, Sparkles, Quote } from "lucide-react";
import { IComment, IPost } from "../scripts/scrapping";

interface CommentsProps {
  post: IPost;
  comments: IComment[];
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

const CommentsModal = ({ post, comments, onRemove }: CommentsProps) => {
  const { formData } = useFormData();
  const [loading, setLoading] = useState(true);

  const handelCommentsClick = (comment: IComment) => {
    if (comment.permalink) {
      window.open(comment.permalink, "_blank", "noopener,noreferrer");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const summaryMarkdown = `# Thread Insights Summary
The discussion is highly technical, focusing on **performance metrics** and **architectural patterns**. Users are generally positive about the latest updates, specifically praising the lower latency.
- **Top Theme**: Strategic AI integration
- **Sentiment**: 84% Positive
- **Engagement**: High`;

  return (
    <div className="flex flex-col w-150 h-162.5 bg-zinc-950 rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden transition-all duration-500">
      <Header
        title="Comment Insights"
        count={loading ? 0 : comments?.length}
        onRemove={onRemove}
      />

      <div className="flex-1 overflow-y-auto custom-scrollbar relative">
        {loading ? (
          <div className="relative h-full flex flex-col pt-4 animate-in fade-in zoom-in-95 duration-700">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent animate-[shimmer_2s_infinite] opacity-50" />

            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <div className="relative">
                <div className="absolute inset-0 bg-orange-500/20 blur-xl rounded-full animate-pulse" />

                <div className="relative w-14 h-14">
                  <svg
                    className="w-full h-full animate-spin text-orange-500"
                    viewBox="0 0 100 100"
                  >
                    <circle
                      className="opacity-20"
                      cx="50"
                      cy="50"
                      r="42"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="transparent"
                    />
                    <circle
                      className="opacity-100"
                      cx="50"
                      cy="50"
                      r="42"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeDasharray="60 100"
                      strokeLinecap="round"
                      fill="transparent"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 bg-orange-500 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.8)] animate-pulse" />
                  </div>
                </div>
              </div>

              <div className="text-center space-y-1">
                <h3 className="text-zinc-100 font-semibold tracking-wide text-sm uppercase">
                  Fetching Posts and its comments..
                </h3>
                <p className="text-zinc-500 text-xs font-medium animate-pulse">
                  Processing real-time data...
                </p>
              </div>
            </div>

            <div className="relative space-y-4 px-2">
              <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/50 via-transparent to-transparent pointer-events-none z-10" />

              <div className="opacity-60 hover:opacity-80 transition-opacity duration-500">
                <SkeletonComment />
              </div>
              <div className="opacity-30 hover:opacity-50 transition-opacity duration-500">
                <SkeletonComment />
              </div>
              <div className="opacity-10 pointer-events-none">
                <SkeletonComment />
              </div>
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
              {comments.map((item) => (
                <div
                  onClick={() => handelCommentsClick(item)}
                  key={item.id}
                  className="group relative bg-zinc-900/40 hover:bg-zinc-900/80 border border-zinc-800 hover:border-orange-500/30 rounded-xl p-4 transition-all duration-300 cursor-pointer"
                >
                  <div className="absolute inset-0 bg-linear-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center bg-white text-black text-[14px] font-bold border border-zinc-700 `}
                        >
                          {item.author.charAt(2).toUpperCase()}
                        </div>
                        <span className="text-xs font-bold text-zinc-300 group-hover:text-zinc-100">
                          {item.author}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 text-orange-500/80 group-hover:text-orange-500">
                        <ArrowUpCircle className="w-4 h-4" />
                        <span className="text-[14px] font-bold">
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
