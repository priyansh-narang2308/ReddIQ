import React from "react";

export interface FormData {
  apiKey: string;
  endpoint: string;
}

export const useFormData = () => {
  const [formData, setFormData] = React.useState<FormData>({
    apiKey: "",
    endpoint: "",
  });
  const hydrated = React.useRef(false);

  React.useEffect(() => {
    try {
      if (typeof chrome !== "undefined" && chrome?.storage?.local?.get) {
        chrome.storage.local.get(["formData"], (result) => {
          const storedFormData = result.formData as FormData | undefined;
          if (storedFormData) {
            setFormData({
              apiKey: storedFormData.apiKey || "",
              endpoint: storedFormData.endpoint || "",
            });
          }
          hydrated.current = true;
        });
        return;
      }

      if (typeof window !== "undefined" && window.localStorage) {
        const raw = window.localStorage.getItem("formData");
        if (raw) {
          const parsed = JSON.parse(raw) as Partial<FormData>;
          setFormData({
            apiKey: parsed.apiKey || "",
            endpoint: parsed.endpoint || "",
          });
        }
      }
      // mark hydrated for non-extension environments
      hydrated.current = true;
    } catch (err) {
      console.warn("Failed to load stored formData:", err);
      // even on error mark hydrated to allow future writes
      hydrated.current = true;
    }
  }, []);

  React.useEffect(() => {
    // Don't persist until we've hydrated from storage. On mount the
    // initial empty state would otherwise overwrite the stored value.
    if (!hydrated.current) return;

    try {
      if (typeof chrome !== "undefined" && chrome?.storage?.local?.set) {
        chrome.storage.local.set({ formData });
        return;
      }
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.setItem("formData", JSON.stringify(formData));
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn("Failed to persist formData:", err);
    }
  }, [formData]);

  return {
    formData,
    setFormData,
  };
};
