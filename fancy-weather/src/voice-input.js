/* eslint-disable no-undef */
/* eslint-disable new-cap */
const voiceInputElement = document.querySelector('.search__icon');

function startDicating() {
  const recognition = new webkitSpeechRecognition();

  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.lang = 'en-US';
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
