async function getAllCookies() {
  const tabs = await chrome.tabs.query({});
  const cookies = [];

  for (let i = 0; i < tabs.length; i++) {
    const tab = tabs[i];
    try {
      pageCookies = await chrome.cookies.getAll({ url: tab.url });

      pageCookies.forEach((cookie) => {
        cookies.push({
          origin: tab.url,
          name: cookie.name,
          value: cookie.value,
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  return cookies;
}

async function getPageCookies(pageUrl) {
  const pageCookiesList = [];
  const pageCookies = await chrome.cookies.getAll({ url: pageUrl });
  pageCookies.forEach((cookie) => {
    pageCookiesList.push({
      origin: pageUrl,
      name: cookie.name,
      value: cookie.value,
    });
  });
  return pageCookiesList;
}

async function putCookieInLocalHost(cookie) {
  const { localHostPort } = await getAsyncStorageProp('configs');
  const localHostUrl = `http://localhost:${localHostPort}/`;
  const TEN_YEARS_SECONDS = 60 * 60 * 24 * 365 * 10; // 10 years

  await chrome.cookies.set({
    url: localHostUrl,
    name: cookie.name,
    value: cookie.value,
    expirationDate: Math.floor(Date.now() / 1000) + TEN_YEARS_SECONDS,
  });
}

async function deleteLocalHostCookie(cookie) {
  const { localHostPort } = await getAsyncStorageProp('configs');
  const localHostUrl = `http://localhost:${localHostPort}/`;
  
  await chrome.cookies.remove({
    url: localHostUrl,
    name: cookie.name,
  });
}


// TODO DELETE THIS
async function openLocalHost(port) {
  const localHostUrl = `http://localhost:${port}/`;
  const localHostTab = await chrome.tabs.query({
    url: localHostUrl,
  });
  if (!localHostTab.length) {
    chrome.tabs.create({ url: localHostUrl, active: false });
  }
}
