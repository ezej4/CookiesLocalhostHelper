const copyToClipboard = (text) => {
  console.log(text);
  navigator.clipboard.writeText(text);
};

const saveCookie = async (item) => {
  const cookie = {
    saved_from: item.origin,
    name: item.key,
    value: item.value,
    created_at: new Date().toISOString(),
  };

  const CONFIGS = await getAsyncStorageProp('configs');

  chrome.storage.sync.set({
    configs: {...CONFIGS, savedCookies: [...CONFIGS.savedCookies, cookie]},
  }); 

}

