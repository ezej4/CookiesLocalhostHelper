const showPopup = (text, timeout = 3000) => {
  const popupElement = document.getElementById('popup');
  const popupTextElement = document.getElementsByClassName('popup__message')[0];
  popupElement.classList.add('popup--show');
  popupTextElement.innerText = text;

  
  setTimeout(() => {
    popupElement.classList.remove('popup--show');
  }, timeout);
};
