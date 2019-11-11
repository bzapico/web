/*
 *  Copyright 2019 Nalej
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *      http://www.apache.org/licenses/LICENSE-2.0
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  let pipe: FilterPipe;

  beforeEach(() => {
      pipe = new FilterPipe();
  });

  it('Return the same list if the "term" is invalid', () => {
    const list = [{ a: 'b' }, { a: 'c' }];
    expect(pipe.transform(list, null)).toBe(list);
    expect(pipe.transform(list, undefined)).toBe(list);
    expect(pipe.transform(null, undefined)).toBe(null);
    expect(pipe.transform(undefined, undefined)).toBe(undefined);
  });

  it('Return the same list if the "list" is invalid', () => {
      expect(pipe.transform(null, 'hello')).toBe(null);
      expect(pipe.transform(undefined, 'hello')).toBe(undefined);
  });

  it('Filter the elements', () => {
      const list = [{ a: 'b' }, { a: 'c' }];
      expect(pipe.transform(list, 'b')).toEqual([{ a: 'b' }]);
  });
});
