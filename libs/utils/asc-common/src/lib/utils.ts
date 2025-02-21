export function mockDate(expected: Date): () => void {
  const _Date = Date;

  function MockDate(mockOverride?: Date | number): Date {
    return new _Date(mockOverride ?? expected);
  }

  MockDate.UTC = _Date.UTC.bind(_Date);
  MockDate.parse = _Date.parse.bind(_Date);
  MockDate.now = () => expected.getTime();
  MockDate.prototype = _Date.prototype;

  global.Date = MockDate as unknown as DateConstructor;

  return () => {
    global.Date = _Date;
  };
}
