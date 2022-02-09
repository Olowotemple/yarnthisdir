import { hello } from '../utils/tests/helpers';

describe('hello', () => {
  test('hello test', () => {
    expect(hello('Temple')).toBe('hello Temple');
  });
});
