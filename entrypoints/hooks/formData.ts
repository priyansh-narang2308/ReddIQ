import React from "react";

export interface FormData {
  apiKey: string;
  endpoint: string;
}

export const useFormData = () => {
  const [formData, setformData] = React.useState<FormData>({
    apiKey: "",
    endpoint: "",
  });

  React.useEffect(() => {
    // to store in the localstorage of chrome
    chrome.storage.local.get(["formData"], (result) => {
      const storedFormData = result.formData as FormData | undefined;
      if (storedFormData) {
        setformData({
          apiKey: storedFormData.apiKey || "",
          endpoint: storedFormData.endpoint || "",
        });
      }
    });
  }, []);

  return {
    formData,
    setformData,
  };
};
