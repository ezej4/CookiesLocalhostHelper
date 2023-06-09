chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(['configs'], (data) => {
    chrome.storage.sync.set({
      configs: data.configs || {
        localHostPort: '5557',
        savedCookies: [],
      },
    });
  });
});
