const colorSwitcher = document.querySelector('.color__icon_current');
const prevColor = document.querySelector('.color__icon_prev');
const red = document.querySelector('.color__icon_red');
const blue = document.querySelector('.color__icon_blue');

function setCurrentColor(color) {
  prevColor.value = colorSwitcher.value;
  colorSwitcher.value = color.value;
}

function switchColors() {
  [prevColor.value, colorSwitcher.value] = [colorSwitcher.value, prevColor.value];
}

export {
  colorSwitcher, prevColor, red, blue, setCurrentColor, switchColors,
};
