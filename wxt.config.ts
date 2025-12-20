import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  manifest: ({ browser, manifestVersion, mode, command }) => {
    return {
      name: "ReddIQ",
      description:
        "A chrome extension for reddit where you can get comment and post insights using AI",
      permissions: [
        "storage",
        "tabs",
        "activeTab",
        "scripting",
        "contextMenus",
        "declarativeNetRequest",
      ],
  
    };
  },
});
