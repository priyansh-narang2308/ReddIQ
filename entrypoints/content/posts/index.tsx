import React, { useState, useEffect } from "react";
import Header from "@/shared/common/header";
import { useFormData } from "@/shared/hooks/formData";
import { MessageSquare, ArrowUpCircle, Globe, Calendar } from "lucide-react";
import { IPost } from "../scripts/scrapping";

interface PostProps {
  posts: IPost[];
  onRemove: () => void;
}

const SkeletonPost = () => (
  <div className="bg-zinc-900/20 border border-zinc-800/50 rounded-xl p-5 animate-pulse space-y-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <div className="w-16 h-4 bg-zinc-800 rounded-md"></div>
        <div className="w-12 h-3 bg-zinc-800/50 rounded-md"></div>
      </div>
      <div className="w-20 h-4 bg-orange-500/10 rounded-md"></div>
    </div>
    <div className="space-y-2">
      <div className="w-full h-5 bg-zinc-800 rounded-md"></div>
      <div className="w-4/5 h-5 bg-zinc-800 rounded-md"></div>
    </div>
    <div className="w-full h-10 bg-zinc-800/30 rounded-md"></div>
    <div className="flex items-center justify-between pt-4 border-t border-zinc-800/30">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-4 bg-zinc-800 rounded-md"></div>
        <div className="w-10 h-4 bg-zinc-800 rounded-md"></div>
      </div>
      <div className="w-24 h-4 bg-zinc-800 rounded-md"></div>
    </div>
  </div>
);

const PostModal = ({ posts, onRemove }: PostProps) => {
  const { formData } = useFormData();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  console.log("Formdata: ", formData);

  return (
    <div className="flex flex-col w-150 h-162.5 bg-zinc-950 rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden transition-all duration-500">
      <Header
        title="Post Insights"
        count={loading ? 0 : posts?.length}
        onRemove={onRemove}
      />

      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar relative">
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
                  Fetching Posts..
                </h3>
                <p className="text-zinc-500 text-xs font-medium animate-pulse">
                  Processing real-time data...
                </p>
              </div>
            </div>

            <div className="relative space-y-4 px-2">
              <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/50 via-transparent to-transparent pointer-events-none z-10" />

              <div className="opacity-60 hover:opacity-80 transition-opacity duration-500">
                <SkeletonPost />
              </div>
              <div className="opacity-30 hover:opacity-50 transition-opacity duration-500">
                <SkeletonPost />
              </div>
              <div className="opacity-10 pointer-events-none">
                <SkeletonPost />
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 animate-in slide-in-from-bottom-4 duration-500">
            {posts.map((post) => (
              <div
                key={post.id}
                className="group relative bg-zinc-900/40 hover:bg-zinc-900/80 border border-zinc-800 hover:border-orange-500/30 rounded-xl p-5 transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] cursor-pointer"
              >
                <div className="absolute inset-0 bg-linear-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${post.color}`}
                      >
                        {post.tag}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-zinc-100 group-hover:text-orange-400 transition-colors mb-2 leading-tight">
                    {post.title}
                  </h3>

                  <p
                    className={`text-sm mb-4 leading-relaxed ${
                      post.description
                        ? "text-zinc-400 line-clamp-2"
                        : "text-zinc-500 italic"
                    }`}
                  >
                    {post.description || "No description available"}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-zinc-800/50">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1.5 text-zinc-400">
                        <ArrowUpCircle className="w-4 h-4 text-orange-500" />
                        <span className="text-xs font-semibold">
                          {post.score}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1.5 text-zinc-400">
                        <MessageSquare className="w-4 h-4" />
                        <span className="text-xs font-semibold">
                          {post.comments}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700">
                        <Globe className="w-3 h-3 text-zinc-400" />
                      </div>
                      <span className="text-xs text-zinc-500 font-medium">
                        {post.author}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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

export default PostModal;
