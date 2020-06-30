export const scrollLoadMore=(ele,cb)=>{
  let timer;
  ele.addEventListener('scroll',()=>{
      clearTimeout(timer);
      timer=setTimeout(()=>{
          let {scrollTop,scrollHeight,offsetHeight}=ele;
          if(scrollHeight-scrollTop-offsetHeight<20){
              console.log('1');
              cb();
          }
      },1000);

  });


};