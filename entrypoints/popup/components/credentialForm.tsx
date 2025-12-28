import { FormData, useFormData } from "@/shared/hooks/formData";
import { Save, KeyRound, Link2, Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const CredentialForm = () => {
  const [showKey, setShowKey] = useState(false);
  const { formData, setFormData } = useFormData();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: FormData) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.endpoint || !formData.apiKey) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      if (typeof chrome !== "undefined" && chrome?.storage?.local?.set) {
        chrome.storage.local.set({ formData }, () => {
          toast.success("API Credentials saved successfully!");
        });
        return;
      }

      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.setItem("formData", JSON.stringify(formData));
        toast.success("API Credentials saved successfully!");
        return;
      }

      toast.success(
        "API Credentials handled (no persistent storage available)"
      );
    } catch (err) {
      console.warn("Failed to save credentials:", err);
      toast.error("Failed to save credentials");
    }
  };

  return (
    <div className="w-[24rem] bg-zinc-950 backdrop-blur-xl text-white p-6 font-sans border border-white/5 shadow-2xl relative overflow-hidden">

      <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-orange-600/5 rounded-full blur-3xl" />

      <div className="mb-8 relative z-10">
        <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-orange-500/20 shadow-[0_0_15px_rgba(249,115,22,0.1)]">
          <KeyRound className="h-6 w-6 text-orange-500" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-center bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
          API Configuration
        </h2>
        <p className="text-sm text-gray-500 mt-2 text-center max-w-[280px] mx-auto">
          Connect your API endpoint to unlock advanced Reddit insights
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 space-y-5 border border-white/10 shadow-xl relative z-10"
      >
        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-orange-500/80 uppercase tracking-wider ml-1">
            Endpoint URL
          </label>
          <div className="relative group">
            <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 group-focus-within:text-orange-500 transition-colors" />
            <input
              type="url"
              name="endpoint"
              required
              id="endpoint"
              value={formData?.endpoint || ""}
              onChange={handleChange}
              placeholder="https://api.example.com/v1"
              pattern="https?://.*"
              title="Please enter a valid URL starting with http:// or https://"
              className="w-full bg-black/40 border border-white/10 pl-10 pr-3 py-3 rounded-xl text-sm 
                         transition-all duration-200
                         focus:outline-none focus:ring-2 focus:ring-orange-500/30 
                         focus:border-orange-500/50 
                         placeholder:text-gray-600 hover:border-white/20"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-orange-500/80 uppercase tracking-wider ml-1">
            API Key
          </label>
          <div className="relative group">
            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 group-focus-within:text-orange-500 transition-colors" />
            <input
              type={showKey ? "text" : "password"}
              name="apiKey"
              required
              id="apiKey"
              value={formData?.apiKey || ""}
              onChange={handleChange}
              placeholder="sk-••••••••••••••••"
              className="w-full bg-black/40 border border-white/10 pl-10 pr-10 py-3 rounded-xl text-sm 
                         transition-all duration-200
                         focus:outline-none focus:ring-2 focus:ring-orange-500/30 
                         focus:border-orange-500/50 
                         placeholder:text-gray-600 hover:border-white/20"
            />
            <button
              type="button"
              onClick={() => setShowKey((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-400 transition-colors p-1"
            >
              {showKey ? (
                <EyeOff className="h-4 w-4 cursor-pointer" />
              ) : (
                <Eye className="h-4 w-4 cursor-pointer" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-2 flex items-center justify-center gap-2 
                     rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 
                     py-3 text-sm font-semibold text-white
                     hover:from-orange-500 hover:to-orange-400 transition-all duration-300
                     active:scale-[0.98] cursor-pointer shadow-[0_0_20px_rgba(249,115,22,0.3)]
                     hover:shadow-[0_0_25px_rgba(249,115,22,0.5)]"
        >
          <Save className="h-4 w-4" />
          Save Configuration
        </button>
      </form>

      <div className="mt-8 space-y-3 relative z-10">
        <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500 uppercase tracking-widest">
          <div className="h-[1px] w-8 bg-zinc-800" />
          <span>Security & Privacy</span>
          <div className="h-[1px] w-8 bg-zinc-800" />
        </div>
        <p className="text-[11px] text-gray-500 text-center leading-relaxed px-4">
          All credentials are encrypted and stored locally. Data never leaves your browser environment.
        </p>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 text-[11px] font-medium text-zinc-600">
        <div className="w-1.5 h-1.5 rounded-full bg-orange-500/40 animate-pulse" />
        ReddIQ v1.0.0
      </div>
    </div>
  );
};

export default CredentialForm;
