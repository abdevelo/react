//board.js 와 member.js 에서 DB 접근 -- DB의 데이터 읽고 쓰기 전문 코드
// DB경로가 모든 파일에 들어가 있을 경우 
// DB 서버가 변경되거나 할 경우 유지보수가 어려우며 해킹의 위험이 크다 


var mysql = require("mysql");
const DBInfo = {
  connectionLimit : 10,
  host : "localhost",
  user : "user01",
  password : "1234", 
  database : "mydb",
  port : 3306 
};

let readpool = mysql.createPool(DBInfo); 
async function mysqlRead (seq, params) 
{
  let promise = new Promise ( (resolve, reject)=> {
      readpool.getConnection( (err,conn)=>{
        if(err)
        {
          console.log(err);
          reject(err);
        }

      conn.query(sql, params, (err, rows)=>{
        console.log(sql);
        console.log(rows);

        if (err)
          reject(err);
        else 
          resolve(rows);
        conn.release();
        
      });
    });
  });
  await promise;
  return promise;
}