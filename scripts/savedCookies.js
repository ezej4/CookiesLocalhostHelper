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
        try {
          await putCookieInLocalHost(item);
          await buildLocalHostCookies();
          showPopup('Done!');
        } catch (error) {
          console.log(error);
          showPopup('Failed');
        }
      });
    }

    if (action.id === 'deleteKey') {
      action.addEventListener('click', async () => {
        try {
          await deleteSavedCookie(index);
          await buildSavedCookies();
          showPopup('Cookie deleted');
        } catch (error) {
          console.log(error);
          showPopup('Failed');
        }
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
    const alias = document.createElement('td');
    const aliasInput = document.createElement('input');

    const key = document.createElement('td');
    const value = document.createElement('td');
    const valueInput = document.createElement('input');
    const created_at = document.createElement('td');
    const actions = document.createElement('td');

    aliasInput.value = cookie.alias;
    key.innerText = cookie.name;
    valueInput.value = cookie.value;
    created_at.innerText = cookie.created_at;

    aliasInput.addEventListener('blur', ({ target }) => {
      const newItem = {
        ...cookie,
        alias: target.value,
      };
      updateSavedCookie(newItem, index);
    });

    valueInput.addEventListener('blur', ({ target }) => {
      const newItem = {
        ...cookie,
        value: target.value,
      };
      updateSavedCookie(newItem, index);
    });

    alias.appendChild(aliasInput);
    value.appendChild(valueInput);

    actions.appendChild(buildSavedCookiesActions(cookie, index));
    row.appendChild(alias);
    row.appendChild(key);
    row.appendChild(value);
    row.appendChild(created_at);
    row.appendChild(actions);

    $savedKeysTableBody.appendChild(row);
  });
};

buildSavedCookies();
