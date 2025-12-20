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
    } catch (err) {

      console.warn("Failed to load stored formData:", err);
    }
  }, []);

 
  React.useEffect(() => {
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
