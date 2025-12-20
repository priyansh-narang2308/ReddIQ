export default defineContentScript({
  matches: ["*://*.google.com/*"],
  main() {
    console.log("Hello content.");

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      console.log("Recieved message in content script: ", request);
      if (request.action === "post") {
        console.log("Post action recieved");
        sendResponse({ status: "Post action handled" });
      } else if (request.action === "comment") {
        console.log("Comment action recieved");
        sendResponse({ status: "Comment action handled" });
      }
    });
  },
});
