const copyToClipboard = (text) => {
  console.log(text);
  navigator.clipboard.writeText(text);
};

const saveCookie = async (item) => {
  const cookie = {
    alias: item.origin,
    name: item.key,
    value: item.value,
    created_at: new Date().toISOString(),
  };

  const CONFIGS = await getAsyncStorageProp('configs');

  chrome.storage.sync.set({
    configs: {...CONFIGS, savedCookies: [...CONFIGS.savedCookies, cookie]},
  }); 

}

const updateSavedCookie = async (item, index) => {
  const cookie = {
    alias: item.alias,
    name: item.name,
    value: item.value,
    created_at: new Date().toISOString(),
  };

  const CONFIGS = await getAsyncStorageProp('configs');

  CONFIGS.savedCookies[index] = cookie;

  console.log(CONFIGS.savedCookies);  

  chrome.storage.sync.set({
    configs: {...CONFIGS, savedCookies: CONFIGS.savedCookies},
  }); 

}

const deleteSavedCookie = async (index) => {
  const CONFIGS = await getAsyncStorageProp('configs');

  CONFIGS.savedCookies.splice(index, 1);

  chrome.storage.sync.set({
    configs: {...CONFIGS, savedCookies: CONFIGS.savedCookies},
  }); 

}
