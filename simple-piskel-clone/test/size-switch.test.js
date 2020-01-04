const Scale = require('../src/canvas/size-switch');

test('should change scale to 2', () => {
  Scale.changeScale(2);
  expect(+window.localStorage.getItem('scale')).toBe(2);
});

test('should change scale to 10', () => {
  Scale.changeScale(10);
  expect(+window.localStorage.getItem('scale')).toBe(10);
});
