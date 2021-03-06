### Jolly Jumper 문제

n개의 정수(n>0)로 이루어진 수열에 대해 서로 인접해 있는 두 수의 차가 1에서 n-1까지의 값을 모두 가지면 그 수열을 유쾌한 점퍼(jolly jumper)라고 부른다. 예를 들어 다음과 같은 수열에서
```
1 4 2 3
```
앞 뒤에 있는 숫자 차의 절대 값이 각각 3,2,1이므로 이 수열은 유쾌한 점퍼가 된다. 어떤 수열이 유쾌한 점퍼인지 판단할 수 있는 프로그램을 작성하라.

Input

각 줄 맨 앞에는 3000 이하의 정수가 있으며 그 뒤에는 수열을 나타내는 n개의 정수가 입력된다.

output

입력된 각 줄에 대해 "Jolly" 또는 "Not Jolly"를 한 줄씩 출력한다

Sample Input
```
4 1 4 2 3
5 1 4 2 -1 6
```
※ 주의: 각 줄의 맨 앞의 숫자는 수열의 갯수이다. 첫번째 입력인 4 1 4 2 3 의 맨 앞의 4는 뒤에 4개의 숫자가 온다는 것을 의미함

Sample Output
```
Jolly
Not jolly
```

---

#### 1. 이해(미지의 것, 주어진 조건, 주어진 자료)
- 배열을 이용하면 될 것 같다.
- 배열의 첫번째 요소는 n으로 정의해야될 듯.
- 각 배열 의 첫번째 값은 3000 이하의 정수이며 수열의 개수 n을 의미함.
- 인접한 두 수의 차가 1부터 n-1까지의 값을 모두 가지려면 두 수의 차가 같은 값을 가지는 인접 숫자 조합이 나와선 안 된다. 두 수의 차로 나오는 숫자의 개수도 n-1개 이기 때문.
- 두 수의 차가 > n-1 이면 조건을 충족하지 못 한다.

#### 2. 계획 
- 입력 배열의 첫번째 요소를 변수 n에 대입한다.
- [1, ... , n-1] 로 이루어진 숫자 배열(targetArr)을 생성한다.
- 입력 배열의 두번째 요소부터 차례로 읽어가며 diff = |arr[n-1] - arr[n]| 을 구한다.
- diff 하나가 나올 때 마다 targetArr에서 해당 요소를 삭제한다.
- 이 diff > n-1보다 클 경우 Not jolly.
- diff 이미 나왔던 숫자라서 targetArr에 diff에 해당하는 숫자가 없다면 Not jolly.
- targetArr의 요소가 모두 삭제되어 length가 0이 될 경우 Jolly.