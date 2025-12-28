import { describe, it, expect, vi, beforeEach } from 'vitest';
import background from './index';

const mockChrome = {
  runtime: {
    onInstalled: {
      addListener: vi.fn(),
    },
    lastError: null,
  },
  contextMenus: {
    create: vi.fn(),
    onClicked: {
      addListener: vi.fn(),
    },
  },
  tabs: {
    sendMessage: vi.fn(),
  },
};

vi.stubGlobal('chrome', mockChrome);

describe('Background Script', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should register context menus on installation', () => {

    if (typeof background.main === 'function') {
      background.main();
      
      const onInstalledListener = mockChrome.runtime.onInstalled.addListener.mock.calls[0][0];
      onInstalledListener();

      expect(mockChrome.contextMenus.create).toHaveBeenCalledWith({
        id: "post",
        title: "Posts Insight",
        contexts: ["all"],
      });
      expect(mockChrome.contextMenus.create).toHaveBeenCalledWith({
        id: "comment",
        title: "Comments Insight",
        contexts: ["all"],
      });
    }
  });

  it('should send message to content script on context menu click', async () => {
    if (typeof background.main === 'function') {
      background.main();

      const onClickedListener = mockChrome.contextMenus.onClicked.addListener.mock.calls[0][0];
      
      const mockInfo = { menuItemId: 'post' };
      const mockTab = { id: 123 };

      await onClickedListener(mockInfo, mockTab);

      expect(mockChrome.tabs.sendMessage).toHaveBeenCalledWith(
        123,
        { action: 'post' },
        expect.any(Function)
      );
    }
  });
});
