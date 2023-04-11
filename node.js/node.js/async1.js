async function sigma(limit) 
{
  sum=0;
  for(i=1;i<=limit; i++)
    sum+= i;
    return sum;
}
// console.log( sigma(100) ); // Async에 의해 
                              // 무조건 Promise{5050} (프라미스 객체)
                              // 을 반환


// async 함수를 호출할 땐 이렇게~ 
// 호출함수도 async 로
async function showDisplay()
{
  // sigma(100)
  // .then( (result)=> {
  //   console.log(result);
  // })

  let result = await sigma(100); // 기다리고, 반환값이 프라미스 객체가 아님
                                  // 본인 함수말고 다른 함수가 완료할 때까지 기다림.
  console.log( result );
}

showDisplay();

