import Model from '../model';

const model = new Model();

test('setPrevColor', () => {
  model.setPrevColor('#ff0000');
  expect(model.prevColor).toBe('#ff0000');
});

test('setCurrentColor', () => {
  model.setCurrentColor('#ff0000');
  expect(model.currentColor).toBe('#ff0000');
});

test('setCurrentTool', () => {
  model.setCurrentTool(1);
  expect(model.currentTool).toBe(1);
});

test('setPenSize', () => {
  model.setPenSize(4);
  expect(model.penSize).toBe(4);
});

test('setCurrentFrame', () => {
  model.setCurrentFrame(5);
  expect(model.currentFrame).toBe(5);
});

test('setScale', () => {
  model.setScale(32);
  expect(model.ctxScale).toBe(32);
});

test('addFrame', () => {
  model.addFrame();
  expect(model.frames.length).toBe(1);
  model.addFrame();
  expect(model.frames.length).toBe(2);
  model.addFrame();
  expect(model.frames.length).toBe(3);
});

test('flipColors', () => {
  model.setPrevColor('#ff0000');
  model.setCurrentColor('#000000');
  model.flipColors();

  expect(model.currentColor).toBe('#ff0000');
  expect(model.prevColor).toBe('#000000');
});
