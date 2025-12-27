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
    <div className="w-[24rem] bg-[#0b1220]/70 backdrop-blur-xl text-white p-5 font-sans border border-white/10 rounded-2xl shadow-2xl">
      <div className="mb-6">
        <h2 className="text-xl font-semibold tracking-tight mt-9 text-center">
          API Configuration
        </h2>
        <p className="text-sm text-gray-400 mt-1 text-center">
          Connect your API endpoint securely
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-[#111a2e]/60 backdrop-blur-lg rounded-xl p-4 space-y-4 border border-white/10 shadow-lg"
      >
        <div>
          <label className="text-xs text-gray-400 mb-1 block">Endpoint</label>
          <div className="relative">
            <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
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
              className="w-full bg-white/5 backdrop-blur-md pl-10 pr-3 py-2.5 rounded-lg text-sm 
             border border-white/10
             focus:outline-none focus:ring-2 focus:ring-indigo-500/40 
             focus:border-indigo-500/40 
             placeholder:text-gray-500"
            />
          </div>
        </div>

        <div>
          <label className="text-xs text-gray-400 mb-1 block">API Key</label>
          <div className="relative">
            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type={showKey ? "text" : "password"}
              name="apiKey"
              required
              id="apiKey"
              value={formData?.apiKey || ""}
              onChange={handleChange}
              placeholder="sk-••••••••••"
              className="w-full bg-white/5 backdrop-blur-md pl-10 pr-10 py-2.5 rounded-lg text-sm 
                         border border-white/10
                         focus:outline-none focus:ring-2 focus:ring-indigo-500/40 
                         focus:border-indigo-500/40 
                         placeholder:text-gray-500"
            />
            <button
              type="button"
              onClick={() => setShowKey((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition"
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
                     rounded-lg bg-indigo-600/90 backdrop-blur-md py-2.5 text-sm font-medium
                     hover:bg-indigo-500 transition
                     active:scale-[0.98] cursor-pointer"
        >
          <Save className="h-4 w-4" />
          Save Credentials
        </button>
      </form>

      <div className="mt-12 text-xs text-gray-400 text-center">
        Stored locally. Never leaves your browser.
      </div>

      <div className="mt-2 text-[11px] text-gray-500 text-center">
        ReddIQ © 2025
      </div>
    </div>
  );
};

export default CredentialForm;
