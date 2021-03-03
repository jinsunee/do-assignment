# 선생님이야, Do Assignment

![image](https://user-images.githubusercontent.com/31176502/108742602-337a1c80-757b-11eb-8613-c2c53f94e404.png)

과제를 출제하고 학생을 관리하는 **선생님**과 그 클래스에 속해서 과제를 수행하고 제출하는 학생을 위한 과제 관리/제출 앱입니다.
관련 문서는 [이곳](https://www.notion.so/4e8c7266fa294cf3bb6ff76f9019495c)에서 정리하고 있습니다.

## Preview

| 과제 추가                                                                                                                                                           | 과제 확인 & 채점 수정                                                                                                                               | 과제 수행                                                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![화면 기록 2021-02-21 오후 5 39 23 오후 12 26 22](https://user-images.githubusercontent.com/31176502/109502478-6329a700-7adc-11eb-88d3-c32afd002fd3.gif) | ![화면 기록 2021-02-21 오후 5 35 36](https://user-images.githubusercontent.com/31176502/109502453-5b6a0280-7adc-11eb-9a80-3808e5c265b8.gif) | ![화면 기록 2021-02-22 오전 4 11 13](https://user-images.githubusercontent.com/31176502/109502490-6886f180-7adc-11eb-8ec5-7c47fb87eaac.gif) |

## Component Structure

```
function App(): React.ReactElement {
  return (
    <RootProvider>
      <AuthHandler>
        <RootNavigator />
      </AuthHandler>
    </RootProvider>
  );
}
```

![Frame 9](https://user-images.githubusercontent.com/31176502/109785263-4e215500-7c4f-11eb-831b-c1b19478e461.png)

## Backend Data Modeling

firebase firestore을 사용했기때문에 Document 기반 nosql 데이터 구조를 설계하여 serverless로 구현했습니다.
![MacBook - 1](https://user-images.githubusercontent.com/31176502/109785862-e9b2c580-7c4f-11eb-95d2-3b5534e120e6.png)

## Skill Stacks

- react-native
- react-navigation
- typescript
- emotion
- redux
- firebase

### Download

<a href="https://apps.apple.com/kr/app/%EC%84%A0%EC%83%9D%EB%8B%98%EC%9D%B4%EC%95%BC/id1545616526#"><img src="https://user-images.githubusercontent.com/27461460/77502559-8c8a8d80-6e9e-11ea-9f8e-0f58c704eed6.png" width="200"/></a><a href="https://play.google.com/store/apps/details?id=com.zazu.doassignment"><img src="https://user-images.githubusercontent.com/27461460/77502571-90b6ab00-6e9e-11ea-9e93-235a319ebb41.png" width="200"/></a>
