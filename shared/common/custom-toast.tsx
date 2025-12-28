import { CheckCircle, Info, Loader2, XCircle, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

interface CustomToastProps {
  message: string;
  isLoading?: boolean;
  status?: "success" | "error" | "info" | "warning";
}

const DURATION = 2000;

const CustomToast = ({
  message,
  isLoading = false,
  status = "success",
}: CustomToastProps) => {
  return toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? "animate-in fade-in slide-in-from-top-4" : "animate-out fade-out slide-out-to-top-2"
        } max-w-md w-full pointer-events-auto flex`}
      >
        <div className={`relative group w-full overflow-hidden rounded-2xl border backdrop-blur-xl shadow-2xl transition-all duration-300
          ${status === "success" ? "bg-zinc-900/90 border-emerald-500/30 shadow-emerald-500/10" : ""}
          ${status === "error" ? "bg-zinc-900/90 border-red-500/30 shadow-red-500/10" : ""}
          ${status === "info" ? "bg-zinc-900/90 border-orange-500/30 shadow-orange-500/10" : ""}
          ${status === "warning" ? "bg-zinc-900/90 border-amber-500/30 shadow-amber-500/10" : ""}
          ${isLoading ? "bg-zinc-900/90 border-zinc-700/30 shadow-zinc-500/10" : ""}
        `}>
          <div className={`absolute -inset-1 opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-40
            ${status === "success" ? "bg-emerald-500" : ""}
            ${status === "error" ? "bg-red-500" : ""}
            ${status === "info" ? "bg-orange-500" : ""}
            ${status === "warning" ? "bg-amber-500" : ""}
            ${isLoading ? "bg-zinc-500" : ""}
          `} />

          <div className="relative p-4 flex items-center gap-4">
            <div className={`p-2.5 rounded-xl transition-transform duration-300 group-hover:scale-110
              ${status === "success" ? "bg-emerald-500/20 text-emerald-400" : ""}
              ${status === "error" ? "bg-red-500/20 text-red-400" : ""}
              ${status === "info" ? "bg-orange-500/20 text-orange-400" : ""}
              ${status === "warning" ? "bg-amber-500/20 text-amber-400" : ""}
              ${isLoading ? "bg-zinc-800 text-zinc-400" : ""}
            `}>
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : status === "success" ? (
                <CheckCircle className="w-5 h-5" />
              ) : status === "error" ? (
                <XCircle className="w-5 h-5" />
              ) : status === "warning" ? (
                <AlertCircle className="w-5 h-5" />
              ) : (
                <Info className="w-5 h-5" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-zinc-100 mb-0.5 tracking-tight">
                {isLoading ? "Please wait..." : status.charAt(0).toUpperCase() + status.slice(1)}
              </p>
              <p className="text-xs text-zinc-400 font-medium leading-relaxed truncate">
                {message}
              </p>
            </div>

  
          </div>

          {!isLoading && (
            <div 
              className={`absolute bottom-0 left-0 h-1 origin-left
                ${status === "success" ? "bg-emerald-500" : ""}
                ${status === "error" ? "bg-red-500" : ""}
                ${status === "info" ? "bg-orange-500" : ""}
                ${status === "warning" ? "bg-amber-500" : ""}
              `}
              style={{ 
                animation: `shrink ${DURATION}ms linear forwards`,
                width: '100%' 
              }}
            />
          )}
          
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes shrink {
              from { transform: scaleX(1); }
              to { transform: scaleX(0); }
            }
          `}} />
        </div>
      </div>
    ),
    {
      duration: isLoading ? Infinity : DURATION,
      position: "top-right",
    }
  );
};

export default CustomToast;
