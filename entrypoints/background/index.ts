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
  },
});
