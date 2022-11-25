// import React,{useState,useEffect} from 'react'

// function Set() {
//     console.log("ren");
//    let count=20;
    
   
//   //  for(var i=0;i<2;i++){
//   //   var tm=setInterval(() => {
//   //     console.log(count-1);
//   //     console.log("intervalId1",tm);
//   //     count--; 
//   //     clearInterval(tm);
//   //   }, 1000);
//   //  }  
   
   
//    console.log("rendering............");
   
//    var tm=setInterval(() => {
//       //  console.log(count-1);
//        console.log("intervalId1",tm);
//        count--; 
//        clearInterval(tm);
//       }, 1000);
    
      
//    var tm=setInterval(() => {
//       //  console.log(count-1);
//       //  console.log("sec");
//        console.log("intervalId2",tm);
//        count--; 
//        clearInterval(tm);
//       }, 1000);
    
      
//   var vm=setInterval(() => {
//     // console.log(count-1);
//     console.log("intervalId3 ",vm);
//     count--;
//     clearInterval(vm);

//   }, 1000);
      
//   // var tm=setTimeout(() => {
//   //   console.log(count-1);
//   //   console.log("tm2 is ",tm);
//   //   count--;
//   //   clearInterval(tm);

//   // }, 1000);
      
//   // var tm=setTimeout(() => {
//   //   console.log(count-1);
//   //   console.log("tm2 is ",tm);
//   //   count--;
//   //   clearInterval(tm);

//   // }, 1000);
     
    
   
    
//       return (
//     <div>
//         count is:{count}
//     </div>
//     )
// }

// export default Set

// import React from "react";
// import axios from "axios";
// function App() {
//   const [image, setImage] = React.useState();
//   const [resfesh, setRefresh] = React.useState(1);
//   React.useEffect(() => {
//     axios
//       .get(`https://dog.ceo/api/breeds/image/random`)
//       .then((response) => setImage(response.data.message));
//   }, [resfesh]);
//   console.log("image", image);
//   return <div>
//     <button onClick={() => {
//       setRefresh(resfesh + 1)
//     }}>next</button>
//     <img src={image} alt="" />
//   </div>;
// }

// export default App;
// import './App.css'
// import {useState} from 'react'
// export default function App() {
//   const [image, setImage] = useState("")
   

//   async function getApi(url){
//     const res=await fetch(url);
//     var data=await res.json();
//     console.log(data);
//     setImage(data.message);
//   }
  
//    return (
//      <div className="App">
//        <img src={image} />
//       <button onClick={()=>{
//        getApi('https://dog.ceo/api/breeds/image/random')
//       }}>Show Image</button>
//      </div>
//     );
// }