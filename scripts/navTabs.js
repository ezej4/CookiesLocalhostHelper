const changeSelectedTab = (tab, sectionId) => {
  const tabs = document.querySelectorAll('.tabBar__link');
  tabs.forEach((tab) => {
    tab.classList.remove('tabBar__link--active');
  });
  tab.classList.add('tabBar__link--active');

  const tabContents = document.querySelectorAll('.tabContent');
  tabContents.forEach((tabContent) => {
    tabContent.classList.remove('tabContent--active');
  });
  const tabContent = document.getElementById(sectionId);
  tabContent.classList.add('tabContent--active');
};




document.getElementById("tabBarLink-allTabsCookies").addEventListener("click", (e) => {
    changeSelectedTab(e.target, "allTabsCookies");
});
document.getElementById("tabBarLink-savedCookies").addEventListener("click", (e) => {
    changeSelectedTab(e.target, "savedCookies");

});
document.getElementById("tabBarLink-localhostKeys").addEventListener("click", (e) => {
    changeSelectedTab(e.target, "localhostKeys");
});

