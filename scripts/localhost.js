const buildLocalHostCookiesActions = (item, index) => {
  const tableActionsTemplate = document.getElementById('tableActions');
  const tableActions = tableActionsTemplate.content.cloneNode(true);
  tableActions.getElementById('saveCookie').remove();
  tableActions.getElementById('putInLocalHost').remove();

  const actions = tableActions.querySelectorAll('a');
  actions.forEach((action) => {
    if (action.id === 'copyToClipboard') {
      action.addEventListener('click', () => {
        copyToClipboard(item.value.replace(/^"(.*)"$/, '$1'));
      });
    }

    action.id = action.id + ' #' + index;
  });

  return tableActions;
};

const buildLocalHostCookies = async () => {
  const { localHostPort } = await getAsyncStorageProp('configs');
  const localHostUrl = `http://localhost:${localHostPort}/`;

  const localhostKeys = await getPageCookies(localHostUrl);

  const $localHostCookiesTableBody = document
    .getElementById('localhostKeys')
    .getElementsByTagName('tbody')[0];

  $localHostCookiesTableBody.innerHTML = '';

  localhostKeys.forEach((cookie, index) => {
    const row = document.createElement('tr');
    const origin = document.createElement('td');
    const key = document.createElement('td');
    const value = document.createElement('td');

    const actions = document.createElement('td');
    origin.innerText = cookie.origin;
    key.innerText = cookie.name;
    value.innerText = cookie.value;

    actions.appendChild(buildLocalHostCookiesActions(cookie, index));
    row.appendChild(origin);
    row.appendChild(key);
    row.appendChild(value);
    row.appendChild(actions);

    $localHostCookiesTableBody.appendChild(row);
  });
};

buildLocalHostCookies();
