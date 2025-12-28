import React, { useState, useEffect } from "react";
import Header from "@/shared/common/header";
import { useFormData } from "@/shared/hooks/formData";
import Markdown from "react-markdown";
import { ArrowUpCircle, Sparkles } from "lucide-react";
import {
  IComment,
  IPost,
} from "../scripts/scrapping";
import SearchComponent from "@/shared/common/search-component";
import axios from "axios";
import CustomToast from "@/shared/common/custom-toast";

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
  const [loading, setLoading] = useState(false);
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);

  const handelCommentsClick = (comment: IComment) => {
    if (comment.permalink) {
      window.open(
        `https://www.reddit.com${comment.permalink}`,
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setAiAnswer(null);
      return;
    }

    setLoading(true);
    setAiAnswer(null);
    try {
      const url = `${formData?.endpoint}?key=${formData.apiKey}`;
      const payload = {
        contents: [
          {
            parts: [
              {
                text: `As a Reddit thread analyst, answer the user's query based on the following discussion.
                
                User Query: "${searchQuery}"
                
                Thread Topic: ${post.title}
                Thread Description: ${post.description}
                
                Comments Data (JSON): ${JSON.stringify(comments.slice(0, 50))}
                
                Instructions:
                1. Provide a direct, insightful response to the query in Markdown.
                2. Use bullet points or bold text for emphasis.
                3. If the answer is found in specific comments, refer to the authors.
                4. keep it concise but thorough.
                5. Do NOT include any JSON, just the Markdown answer.`,
              },
            ],
          },
        ],
      };

      const res = await axios.post(url, payload);
      const answer =
        res.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "I couldn't generate an answer based on this discussion.";

      setAiAnswer(answer);
    } catch (error) {
      CustomToast({ message: "Search failed: AI error", status: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-150 h-162.5 bg-zinc-950 rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden transition-all duration-500">
      <Header
        title="Comment Insights"
        count={comments?.length}
        onRemove={onRemove}
      />

      <SearchComponent handleSearch={handleSearch} />

      <div className="flex-1 overflow-y-auto custom-scrollbar relative px-4 py-4 space-y-4">
        {loading ? (
          <div className="relative h-full flex flex-col pt-4 animate-in fade-in zoom-in-95 duration-700">
            <div className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-transparent via-orange-500 to-transparent animate-[shimmer_2s_infinite] opacity-50" />

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
                  Consulting ReddIQ...
                </h3>
                <p className="text-zinc-500 text-xs font-medium animate-pulse">
                  Synthesizing thread data for you...
                </p>
              </div>
            </div>

            <div className="relative space-y-4 px-2">
              <div className="absolute inset-0 bg-linear-to-b from-zinc-950/50 via-transparent to-transparent pointer-events-none z-10" />

              <div className="opacity-60 hover:opacity-80 transition-opacity duration-500">
                <SkeletonComment />
              </div>
              <div className="opacity-30 hover:opacity-50 transition-opacity duration-500">
                <SkeletonComment />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col animate-in slide-in-from-bottom-4 duration-500 space-y-4">
            {aiAnswer && (
              <div className="group relative bg-orange-500/5 hover:bg-orange-500/10 border border-orange-500/20 rounded-2xl p-6 transition-all duration-300 shadow-[0_0_30px_rgba(249,115,22,0.05)]">
                <div className="absolute top-4 right-4 animate-pulse">
                  <Sparkles className="w-5 h-5 text-orange-500/50" />
                </div>
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center space-x-2 text-orange-400 font-bold uppercase tracking-[0.2em] text-[10px]">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                    <span>ReddIQ Analysis</span>
                  </div>
                  <div
                    className="prose prose-invert prose-sm max-w-none 
                    prose-p:text-zinc-300 prose-p:leading-relaxed
                    prose-headings:text-zinc-100 prose-headings:font-bold prose-headings:mb-3
                    prose-strong:text-orange-400 prose-strong:font-bold
                    prose-ul:my-4 prose-li:my-1 prose-li:text-zinc-400"
                  >
                    <Markdown>{aiAnswer}</Markdown>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                  Original Discussion ({comments.length})
                </h4>
              </div>
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
                          className={`w-8 h-8 rounded-full flex items-center justify-center bg-orange-500/10 text-orange-400 text-[14px] font-bold border border-orange-500/20 `}
                        >
                          {item.author.charAt(0).toUpperCase()}
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
