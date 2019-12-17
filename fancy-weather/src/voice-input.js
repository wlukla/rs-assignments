import { currentLangElement } from './translate';

/* eslint-disable no-undef */
/* eslint-disable new-cap */
const voiceInputElement = document.querySelector('.search__icon');

function startDicating() {
  const recognition = new webkitSpeechRecognition();

  recognition.continuous = false;
  recognition.interimResults = false;

  let lang = currentLangElement.innerHTML;
  switch (lang) {
    case 'EN':
      lang = 'en-US';
      break;
    case 'RU':
      lang = 'ru-RU';
      break;
    case 'UA':
      lang = 'uk-UA';
      break;
    default:
  }

  recognition.lang = lang;
  recognition.start();

  recognition.onresult = (e) => {
    document.querySelector('.search__input').value = e.results[0][0].transcript;
    recognition.stop();
  };

  recognition.onerror = () => {
    recognition.stop();
  };
}

export { voiceInputElement, startDicating };
