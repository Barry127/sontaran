const gt = require('./gt');
const greaterThan = require('./greaterThan');

test('gt exports greaterThan', () => {
  expect(gt).toBe(greaterThan);
});
