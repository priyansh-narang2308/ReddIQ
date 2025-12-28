# ReddIQ - AI-Powered Reddit Insights

ReddIQ is a professional browser extension designed to enhance the Reddit experience by providing intelligent post and comment analysis. It leverages advanced language models to summarize complex discussion threads, analyze community sentiment, and highlight critical insights in real-time.

## Configuration and Setup

Before using ReddIQ, you must configure your API credentials. The extension requires a valid AI model endpoint and an API key to function.

### Mandatory API Configuration
1. Open the ReddIQ extension popup from your browser's toolbar.
2. Locate the Credential Configuration form.
3. Enter your AI Model Endpoint:
   - Endpoint URL: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`
4. Enter your API Key.
5. Save the credentials. These are stored locally within your browser's secure storage and are never transmitted to any third-party server other than the specified endpoint.

## Features

ReddIQ integrates directly into the Reddit interface to provide the following capabilities:

- **Post Insights**: Summarizes the content of a post and identifies the main discussion points.
- **Contextual Querying**: Allows users to ask specific questions about a thread and receive AI-generated summaries focused on those queries.
- **Modern UI Architecture**: Uses Shadow DOM for isolation, ensuring that extension styles do not conflict with Reddit's native CSS.

## Technical Details

### Permissions Required
The extension requires the following permissions for full functionality:
- `storage`: For local persistence of API credentials.
- `tabs` & `activeTab`: To interact with the current Reddit page.
- `scripting`: To inject analysis components.
- `contextMenus`: To provide easy access to insights via right-click.
- `declarativeNetRequest`: For managing secure communication with the AI endpoint.

### Design and Implementation
- **Frontend**: Built with React and TypeScript, incorporating Lucide icons and Tailwind CSS for a premium aesthetic.
- **DOM Interaction**: Utilizes Reddit's `shreddit` CSS selectors for precise data extraction.
- **Style Isolation**: Implements Shadow DOM to maintain UI consistency and prevent layout shifts on the host page.

## Testing and Development

ReddIQ uses Vitest for unit testing. The test suite covers:
- DOM extraction logic for posts and comments.
- Background script message handling and context menu registration.

To run the tests locally:
```bash
pnpm install
pnpm test
```

## Security and Privacy
ReddIQ prioritizes user privacy. All API credentials and extracted data are handled locally. Communication with the AI model is direct from the browser to the configured endpoint.
