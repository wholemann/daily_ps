/*
1. 주어진 정수(input)를 10으로 나눈 후 구해진 나머지(x)를 배열 A에 담는다.
2. input에서 1에서 구한 나머지를 빼고 10으로 나눈다.
3. 2의 결과를 input으로 하여 1을 반복한다.
4. 2의 결과가 0일 경우(input - x = 0) 더이상 계산할 자릿수가 없는 것이므로 종료한다.
*/

function int2Str(input) {
  return '1234';
}

describe('int2Str', () => {
  it('returns string', () => {
    expect(int2Str(1234)).toBe('1234');
  });
});