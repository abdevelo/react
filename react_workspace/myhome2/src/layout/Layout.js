import 'bootstrap/dist/css/bootstrap.min.css'; //qㅜ트스트랩 라이브러리 
import {Outlet,Link,NavLink} from 'react-router-dom';

/*w3스쿨즈에서 부트스트랩 Navbar가져오기
    <div>태그내에 입력해주고
    대신 주의할 점은 class->className으로 바꿔야 함
    ctrl+h 로 찾기+바꾸기 이용*/

function Layout() {
  return (

    /*Anchor태그말고 NavLink를 쓰자 
          Anchor태그 쓰면 페이지 전체가 새로고침 되기 때문에
          (주의)NavLink는 react-router-dom에서 import해야 한다
          형식 <NavLink className="" to="/">PageName></NavLink> 
              (주의) NavLink에 대문자 구분 잘하기..되도록이면 자동완성으로 하기
                     anchor의 href대신 to를 사용한다*/
    <div>
      <nav className="navbar navbar-expand-sm bg-danger navbar-dark">
        <div className="container-fluid">
          <ul className="navbar-nav">
            <li className="nav-item">
            <NavLink className="nav-link" to="/Home">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/board/list">Board</NavLink>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Link</a>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="#">Disabled</a>
            </li>
          </ul>
        </div>
      </nav>

    <div style={{marginTop:"20px"}}/>
    <Outlet /> 
      {/* 아울렛이 컴포넌트가 출력되는 위치 */}
    </div>
  );
};

export default Layout;