const buildSavedCookiesActions = (item, index) => {
  const tableActionsTemplate = document.getElementById('tableActions');
  const tableActions = tableActionsTemplate.content.cloneNode(true);
  tableActions.getElementById('saveCookie').remove();


  const actions = tableActions.querySelectorAll('a');
  actions.forEach((action) => {
    if (action.id === 'copyToClipboard') {
      action.addEventListener('click', () => {
        copyToClipboard(item.value.replace(/^"(.*)"$/, '$1'));
      });
    }

    if (action.id === 'putInLocalHost') {
      action.addEventListener('click', async () => {
        console.log('putInLocalHost');
        await putCookieInLocalStorage(item);
        await buildLocalHostCookies();
      });
    }

    action.id = action.id + ' #' + index;
  });

  return tableActions;
};

const buildSavedCookies = async () => {
  const CONFIGS = await getAsyncStorageProp('configs');

  const $savedKeysTableBody = document
    .getElementById('savedCookies')
    .getElementsByTagName('tbody')[0];

  $savedKeysTableBody.innerHTML = '';

  CONFIGS.savedCookies.forEach((cookie, index) => {
    const row = document.createElement('tr');
    const saved_from = document.createElement('td');
    const key = document.createElement('td');
    const value = document.createElement('td');
    const created_at = document.createElement('td');
    const actions = document.createElement('td');
    saved_from.innerText = cookie.saved_from;
    key.innerText = cookie.name;
    value.innerText = cookie.value;
    created_at.innerText = cookie.created_at;

    actions.appendChild(buildSavedCookiesActions(cookie, index));
    row.appendChild(saved_from);
    row.appendChild(key);
    row.appendChild(value);
    row.appendChild(created_at);
    row.appendChild(actions);

    $savedKeysTableBody.appendChild(row);
  });
};

buildSavedCookies();
