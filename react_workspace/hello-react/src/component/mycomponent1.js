// 확장자 다운받은 후 
// rcc 적으면 첫 시작 틀 (import 부터 class 하고 export까지 만들어줌)
import React, { Component } from 'react';

//클래스명과 파일명이 일치할 필요는 없음
//파일명은 무조건 소문자로 해야함
//클래스 명의 시작은 대문자로 해야함
class Mycomponent1 extends Component {
  render() {
    return (
      <div>
        <h1>클래스 기반 컴포넌트 </h1>
      </div>
    )
    ;
  }
}

export default Mycomponent1;
