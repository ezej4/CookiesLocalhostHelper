const buildAllCookiesActions = (item, index) => {
  const tableActionsTemplate = document.getElementById('tableActions');
  const tableActions = tableActionsTemplate.content.cloneNode(true);
  const actions = tableActions.querySelectorAll('a');
  actions.forEach((action) => {
    if (action.id === 'copyToClipboard') {
      action.addEventListener('click', () => {
        copyToClipboard(item.value.replace(/^"(.*)"$/, '$1'));
      });
    }

    if (action.id === 'saveCookie') {
      action.addEventListener('click', async () => {
        try {
          await saveCookie(item);
          await buildSavedCookies();
          showPopup('Cookie saved');
        } catch (error) {
          console.log(error);
          showPopup('Failed');
        }
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

    action.id = action.id + ' #' + index;
  });

  return tableActions;
};

const buildAllCookiesTable = async () => {
  const data = await getAllCookies();
  data.forEach((item, index) => {
    const row = document.createElement('tr');
    const origin = document.createElement('td');
    const key = document.createElement('td');
    const value = document.createElement('td');
    const actions = document.createElement('td');
    origin.innerText = item.origin;
    key.innerText = item.name;
    value.innerText = item.value;
    actions.appendChild(buildAllCookiesActions(item, index));
    row.appendChild(origin);
    row.appendChild(key);
    row.appendChild(value);
    row.appendChild(actions);
    document
      .getElementById('allTabsCookies')
      .getElementsByTagName('tbody')[0]
      .appendChild(row);
  });
};

buildAllCookiesTable();
