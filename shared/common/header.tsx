import { X } from "lucide-react";

interface HeaderProps {
  title: string;
  count: number;
  onRemove: () => void;
}

const Header = ({ title, count, onRemove }: HeaderProps) => {
  return (
    <div className="px-4 py-3 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50 backdrop-blur-sm rounded-t-xl">
      <h2 className="text-lg font-bold text-orange-500 flex items-center gap-2">
        {title}
        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-300">
          {count}
        </span>
      </h2>
      <div className="flex items-center">
        <button
          onClick={onRemove}
          className="p-1.5 rounded-lg text-zinc-400 cursor-pointer hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Header;
