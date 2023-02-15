import { FormatTimePipe } from './format-time.pipe';

describe('FormatTimePipe', () => {
  interface FixtureFormatTimePipe {
    minutes: number;
    expectedValue: string;
  }
  const fixtures: FixtureFormatTimePipe[] = [
    {
      minutes: 90,
      expectedValue: '1h 30m'
    },
    {
      minutes: 20,
      expectedValue: '0h 20m'
    },
    {
      minutes: 300,
      expectedValue: '5h 0m'
    }
  ];

  let pipe: FormatTimePipe;

  beforeEach(() => {
    pipe = new FormatTimePipe();
  });

  it('create an instance', () => {
    pipe = new FormatTimePipe();
    expect(pipe).toBeTruthy();
  });

  it('transform to correctly formated time', () => {
    for (const fixture of fixtures) {
      expect(pipe.transform(fixture.minutes)).toBe(fixture.expectedValue);
    }
  });
});
