var mysql=require("mysql");
var pool = mysql.createPool({
  connectionLimit: 10,
  host:"127.0.0.1",
  user :"user01",
  password : "1234",
  database : "mydb" ,
  port : 3306
})

//디비와 연결을 한다
pool.getConnection( (err,connection)=>{
  //디비와 연결을 성공하면 매개변수로 전달된 함수가 호출
  //err - 디비와 연결실패 시 처리 
  if ( err)
  {
    console.log(err);
    return;
  }
  //연결 성공 시 연결객체 connection을 전달한다 
  //연결 객체 
  console.log("connection success");
  

  new Promise((resolve, reject)=>{
      sql =  ` 
              insert into tb_board(title, writer, contents, wdate)
              values( ?, ?, ?,now())
            `; // 프로램에서 쌍따옴표 내에 sql문 작성할 때는 세미콜론 빼고
      let params =['제목3','장길산','내용3'];



      connection.query(sql, params, (err, rows)=>{
        if(err)
          reject("db 오류");
        else
          resolve("success"); //then구문으로 이동
      });



  }).
  then( (result)=> {

    sql = "select * from tb_board";
    connection.query( sql, (err, rows) => {
      if ( err )
        console.log("err");
      else 
        console.log(rows);
    });

  })
  .catch( (error)=> {
    console.log(error);
  })



});
console.log("end");


    // connection.release(); // 연결 해제 