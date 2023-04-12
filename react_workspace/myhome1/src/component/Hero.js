import React, { useState } from 'react';

function Hero(props){
  
  const[heroList, setHeroList]=useState
  (
    [
      {id:1, name:"아이언맨", descr:"슈트로 악당 처치"},
      {id:2, name:"토르", descr:"망치로 악당 처치"},
      {id:3, name:"스칼렛요한슨", descr:"체조로 악당 처치"},
      {id:4, name:"앤트맨", descr:"개그로 악당 처치"},
    ]
  );

  const[hero,setHero]=useState({name:"",descr:""});

  const nameChange=(e)=>{
    let h = hero; // 기존 값 받아와서
    h.id=999;
    h.name=e.target.value;
    setHero(h);
    console.log(hero);
  };
  const descrChange=(e)=>{
    let h = hero;
    h.descr=e.target.value;
    setHero(h);
  };
  const goAppend=()=>{
    console.log(hero);
    setHeroList(heroList.concat( hero ));
    setHero({name:"", descr:""});

    
  };
  return(
    <div>
      이름 : <input type="text" onChange={nameChange}></input><br/>
      업적 : <input type="text" onChange={descrChange}></input><br/>
      <button type="button" onClick={goAppend}>추가</button><br/><br/>
      <table>
        <tbody>
        {
        heroList.map( (hero,index)=>{
          return( 
            <tr key={index}>
              <td>{hero.id}</td>
              <td>{hero.name}</td>
              <td>{hero.descr}</td>
            </tr>
          )
        })
        }
        </tbody>
      </table>
    </div>
  )
}

export default Hero;