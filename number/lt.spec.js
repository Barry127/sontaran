const lt = require('./lt');
const lessThan = require('./lessThan');

test('lt exports lessThan', () => {
  expect(lt).toBe(lessThan);
});
