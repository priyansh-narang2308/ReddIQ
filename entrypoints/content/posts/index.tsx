import React, { useState } from "react";
import Header from "@/shared/common/header";
import { useFormData } from "@/shared/hooks/formData";
import {
  TrendingUp,
  MessageSquare,
  ArrowUpCircle,
  Zap,
  Globe,
  ShieldCheck,
  Calendar
} from "lucide-react";

interface PostProps {
  posts: any;
  onRemove: () => void;
}

const PostModal = ({ posts, onRemove }: PostProps) => {
  const { formData } = useFormData();
  const [loading, setLoading] = useState(false);

  const postData = [
    {
      id: 1,
      tag: "Technology",
      title: "Revolutionizing AI with Quantum Technology",
      description: "Explore groundbreaking advancements in AI and quantum computing that are shifting paradigms in data processing and neural networks.",
      score: "4.5k",
      comments: 128,
      author: "u/tech_pioneer",
      time: "2h ago",
      color: "bg-blue-500/10 text-blue-400 border-blue-500/20"
    },
    {
      id: 2,
      tag: "Productivity",
      title: "The Ultimate Workflow Strategy for 2024",
      description: "How to leverage modern tooling and psychological hacks to achieve deep work and massive output without burnout.",
      score: "3.2k",
      comments: 94,
      author: "u/productivity_pro",
      time: "5h ago",
      color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
    },
    {
      id: 3,
      tag: "Strategy",
      title: "Scaling SaaS from 0 to $1M ARR",
      description: "A comprehensive breakdown of the growth loops and retention mechanics used by top-performing B2B SaaS companies.",
      score: "5.1k",
      comments: 245,
      author: "u/saas_founder",
      time: "1h ago",
      color: "bg-purple-500/10 text-purple-400 border-purple-500/20"
    },
  ];

  return (
    <div className="flex flex-col w-150 max-h-[85vh] overflow-hidden bg-zinc-950 rounded-2xl border border-zinc-800 shadow-2xl">
      <Header
        title="Post Insights"
        count={postData.length}
        onRemove={onRemove}
      />

      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-12 h-12 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin"></div>
            <p className="text-zinc-400 font-medium animate-pulse">Analyzing thread data...</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {postData.map((post) => (
              <div
                key={post.id}
                className="group relative bg-zinc-900/40 hover:bg-zinc-900/80 border border-zinc-800 hover:border-orange-500/30 rounded-xl p-5 transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
              >
                <div className="absolute inset-0 bg-linear-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${post.color}`}>
                        {post.tag}
                      </span>
                      <span className="text-zinc-500 text-xs flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {post.time}
                      </span>
                    </div>
                
                  </div>

                  <h3 className="text-lg font-bold text-zinc-100 group-hover:text-orange-400 transition-colors mb-2 leading-tight">
                    {post.title}
                  </h3>

                  <p className="text-zinc-400 text-sm line-clamp-2 mb-4 leading-relaxed">
                    {post.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-zinc-800/50">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1.5 text-zinc-400">
                        <ArrowUpCircle className="w-4 h-4 text-orange-500" />
                        <span className="text-xs font-semibold">{post.score}</span>
                      </div>
                      <div className="flex items-center space-x-1.5 text-zinc-400">
                        <MessageSquare className="w-4 h-4" />
                        <span className="text-xs font-semibold">{post.comments}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700">
                        <Globe className="w-3 h-3 text-zinc-400" />
                      </div>
                      <span className="text-xs text-zinc-500 font-medium">{post.author}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

     

      <style dangerouslySetInnerHTML={{
        __html: `
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
      `}} />
    </div>
  );
};

export default PostModal;
