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

test('flipColors', () => {
  model.setPrevColor('#ff0000');
  model.setCurrentColor('#000000');
  model.flipColors();

  expect(model.currentColor).toBe('#ff0000');
  expect(model.prevColor).toBe('#000000');
});

test('addFrame', () => {
  model.addFrame();
  expect(model.framesData.length).toBe(1);
  model.addFrame();
  expect(model.framesData.length).toBe(2);
  model.addFrame();
  expect(model.framesData.length).toBe(3);
});

test('addFrameDataURL', () => {
  const tempModel = new Model();

  tempModel.addFrameDataURL();
  expect(tempModel.framesDataURL.length).toBe(1);
  tempModel.addFrameDataURL();
  expect(tempModel.framesDataURL.length).toBe(2);
  tempModel.addFrameDataURL();
  expect(tempModel.framesDataURL.length).toBe(3);
});

test('deleteFrame', () => {
  const tempModel = new Model();

  tempModel.addFrameDataURL();
  tempModel.addFrame();

  tempModel.deleteFrame(0);

  expect(tempModel.framesData.length).toBe(0);
  expect(tempModel.framesDataURL.length).toBe(0);

  tempModel.currentFrame = 1;

  tempModel.addFrameDataURL();
  tempModel.addFrame();

  tempModel.deleteFrame(0);

  expect(tempModel.framesData.length).toBe(0);
  expect(tempModel.framesDataURL.length).toBe(0);
  expect(tempModel.currentFrame === 0);
});

test('duplicateFrame', () => {
  model.duplicateFrame(1);

  expect(model.framesData[1]).toBe(model.framesData[2]);
  expect(model.framesDataURL[1]).toBe(model.framesDataURL[2]);
});
