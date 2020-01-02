const sizeButtons = document.querySelectorAll('.sheet__size-switcher');
const [size128Button, size64Button, size32Button] = sizeButtons;

function changeScale(i) {
  window.localStorage.setItem('scale', i);
}

export {
  size128Button, size64Button, size32Button, changeScale, sizeButtons,
};
