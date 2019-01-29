import { SortByPipe } from './sort-by.pipe';

describe('SortByPipe', () => {
  let pipe: SortByPipe;

  beforeEach(() => {
    pipe = new SortByPipe();
  });

  it('should order by id', () => {
    const numbers = [
      { id: 3 },
      { id: 2 },
      { id: 1 }
    ];
    const sortedNumbers = [
      { id: 1 },
      { id: 2 },
      { id: 3 }
    ];

    expect(pipe.transform(numbers, 'id')).toEqual(sortedNumbers);
  });

  it('should order case-insensitively strings too', () => {
    const array = [{ string: 'Abc' }, { string: 'aaa' }, { string: 'b' }];
    const arraySorted = [{ string: 'aaa' }, { string: 'Abc' }, { string: 'b' }];

    expect(pipe.transform(array, 'string', false, true)).toEqual(arraySorted);
  });

  it('should ordered by array', () => {
    const array = [
      { values: [10, 0] },
      { values: [1, 2] },
      { values: [0, -1, 1] }
    ];
    const arraySorted = [
      { values: [0, -1, 1] },
      { values: [1, 2] },
      { values: [10, 0] }
    ];

    expect(pipe.transform(array, 'values')).toEqual(arraySorted);
  });

  it('should return change to order with custom comparator', () => {
    const arr = ['$10,0', '$2,0', '$100,0'];
    const res = ['$2,0', '$10,0', '$100,0'];

    const parse = value => parseInt(value.replace(/[^0-9]/g, ''), 10);

    expect(pipe.transform(arr, null, false, true, (a, b) => {
      const newA = parse(a);
      const newB = parse(b);
      return newA > newB ? 1 : -1;
    })).toEqual(res);
  });
});
