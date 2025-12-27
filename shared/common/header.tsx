import { X, TrendingUp } from "lucide-react";

interface HeaderProps {
  title: string;
  count: number;
  onRemove: () => void;
}

const Header = ({ title, count, onRemove }: HeaderProps) => {
  return (
    <div className="px-5 py-4 border-b border-zinc-800/50 flex items-center justify-between bg-zinc-900/40 backdrop-blur-xl rounded-t-2xl">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center border border-orange-500/30">
          <TrendingUp className="w-4 h-4 text-orange-500" />
        </div>
        <h2 className="text-lg font-extrabold tracking-tight text-zinc-100 flex items-center gap-3">
          {title}
          <span className="flex items-center justify-center px-2 min-w-[20px] h-5 text-[10px] font-black rounded-md bg-orange-500 text-white shadow-[0_0_15px_-3px_rgba(249,115,22,0.5)]">
            {count}
          </span>
        </h2>
      </div>
      <div className="flex items-center">
        <button
          onClick={onRemove}
          className="p-2 rounded-xl text-zinc-500 hover:text-zinc-100 hover:bg-zinc-800/80 transition-all duration-200 cursor-pointer group"
        >
          <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
};

export default Header;
