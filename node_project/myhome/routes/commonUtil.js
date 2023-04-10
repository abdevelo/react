// routes폴더에 놓을 것 commonUtil.js
function getPaging(pg, totalCnt, pageGroupSize=10)
{
  /*                              실제배열    id    그룹번호
   1  2  3  4  5  6  7  8  9  10  0~9        1~10      1
   11 12 13 14 15 16 17 18 19 20  10~19      11~20     2
   21 22 23 24 25 26 27           20~16      21~27     3

                               몫
   (1-1)/10*10 , (2-1)/10*10 = 0
   (2-1)/10*10      1/10*10  = 0
   ...
   (10-1)/10*10     9/10*10  = 0
   (11-1)/10*10    10/10*10  = 10
   ....
   (21-1)/10*10    20/10*10  = 20

   전체 페이지 개수, 어느 그룹에 속하는 지 알아야 한다.
   pnTotal = totalCnt/10; 
          한 페이지당 데이터가 10개일 때  
          ex) 15건의 게시물이 있다고 하면 --> 2페이지가 필요 ---- >따라서 강제 올림을 해야 함
    강제 올림은 Math.ceil( )

          두 개를 합치면 
    pnTotal= Math.ceil( totalCnt/10 );
   */

    // pnTotal= Math.ceil( totalCnt/10 );
    pnTotal= Math.ceil( totalCnt/pageGroupSize );
    pgGroupStart = parseInt((pg-1)/pageGroupSize) * pageGroupSize + 1; //parseInt 는 소숫점 자르기 위해 사용= 나눈 값의 몫을 구하기 위해 사용
    pgGroupEnd = pgGroupStart + 10 -1 ; 
    if (pgGroupEnd>pnTotal)
      pgGroupEnd = pnTotal+1;

    console.log( pg, pgGroupStart, pgGroupEnd);

    //함수는 반환값이 하나여야 한다. JSON객체로 만들자 
    // 함수는 기본적으로 return값을 하나만 넘길 수 있기 때문에 
    // JSON객체로 넘기면 주소값을 보내기 때문에 여러 개의 값을 보낼 수 있음. 
    return {pnTotal:pnTotal, pnStart:pgGroupStart, pnEnd:pgGroupEnd, pg:pg};
}
// for(i=1; i<=32; i++)
//   getPaging(i, 320);

/** 실행 값
 * 1 1 10
2 1 10
3 1 10
4 1 10
5 1 10
6 1 10
7 1 10
8 1 10
9 1 10
10 1 10
11 11 20
12 11 20
13 11 20
14 11 20
15 11 20
16 11 20
17 11 20
18 11 20
19 11 20
20 11 20
21 21 30
22 21 30
23 21 30
24 21 30
25 21 30
26 21 30
27 21 30
28 21 30
29 21 30
30 21 30
31 31 33
32 31 33
 * 
 * 
*/

exports.getPaging=getPaging;

// commonUtil.js로 유틸 만들어서 exports 하고
// board.js 가서 require이용해서 imports하고 
// board.js내에 pg당 llist를 보여주는 라우터에가서 render해오는 값에 넣어주기
// render값에 넣어줄 때는 받는 값은 paging 으로 하고 받아오는 값은 
// js 파일로부터 받아와야 하기 때문에 commonUtil의  getPaging함수를 받아오는데 매개변수를 (pg, totalCnt) 로 받는다 라고 적기 