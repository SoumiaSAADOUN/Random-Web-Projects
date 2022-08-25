let p = new Promise((resolve, reject) => {
  let a = 1 + 1;
  if (a == 2) {
    resolve("success");
  } else reject("failed");
});

p.then((message)=> {
    console.log('We are int hen ' + message);
}).catch((message)=>{
    console.log("hi from catch " +message);
})


function w (){
    return Promise((resolve, reject)=>{

    });
}  


