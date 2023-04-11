import React, { Component } from 'react';

class Appclass extends Component {
  //생성자 - props와 state를 사용하고 싶으면 반드시 생성자를 써라
  constructor(props)
  {
    // 부모 생성자를 호출
    // 이 코드는 반드시 생성자의 첫번째 위치에 있어야 함
    // 다른 코드가 앞에 올 수 없음
    super(props); 
    this.state = { name: "홍길동", age:23 , phone:"010-0000-0000"};
    // state객체는 각 컴포넌트마다 있음.
    // 이 객체에 json형태의 객체를 저장할 수 있음
    // 개별 변수는 태그에서 사용 못함

  }
  render() {
    const {name, age, phone} = this.state; 
    // ******Json 해체 (Destruction) *******
    // 오른쪽의 this.state에 json이 저장되어 있음 
    // 왼쪽이 json을 해체시킴 
    // const name = this.state.name;
    // const age = this.state.age;
    // 위의 코드를 한번에 쓸 수 있도록 한 것임
    // 그렇게 되면 아래의 return에서도 
    // <h3> 이름 : {this.state.name} </h3>
    // 로 일일히 적어주지 않아도 됨
    // 해체는 엄밀히 말하면 react건 아니고 모던스크립트 문법임

    const {title, address } = this.props; 
    return (
      <div>
        <h1> {title}</h1>
        <h3> 이름 : {name} </h3>
        <h3> 나이 : {age} </h3>
        <h3> 전화번호 : {phone} </h3>
        <h3> 주소 : {address}</h3>
      {/*위의 주소 this.props.address값은 App.js의 부모 객에서 전달해 준 값을 받아옴**/}
        <button type="button" onClick={ ()=> {alert("press");}}>클릭</button>
        {/*위의 버튼에서 함수는 일반함수 X , 람다 O 무조건!! */}
      </div> 
    );
  }
}

export default Appclass;