export default defineBackground({
  main() {
    // this is triggered when u install the chrome extension
    chrome.runtime.onInstalled.addListener(() => {
      chrome.contextMenus.create({
        id: "post",
        title: "Posts Insight",
        contexts: ["all"],
      });
      chrome.contextMenus.create({
        id: "comment",
        title: "Comments Insight",
        contexts: ["all"],
      });
  });

    chrome.contextMenus.onClicked.addListener(async (info, tab) => {
      if (!tab?.id) {
        console.error("❌ No tab ID found for context menu click");
        return;
      }

      console.log("🖱️ Context menu clicked:", info.menuItemId, "on tab:", tab.id);

      if (info.menuItemId === "post" || info.menuItemId === "comment") {
        chrome.tabs.sendMessage(
          tab.id,
          { action: info.menuItemId },
          (response) => {
            if (chrome.runtime.lastError) {
              console.error(
                "❌ Error sending message to content script:",
                chrome.runtime.lastError.message
              );
              console.log("💡 Tip: Try refreshing the page you're on.");
            } else {
              console.log("✅ Message sent successfully, response:", response);
            }
          }
        );
      }
    });
  },
});
