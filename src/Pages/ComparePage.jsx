import Graph from "../Component/Graph";
import React,{useEffect,useState} from 'react'
import{auth,db} from '../firebaseConfig'
import { useParams } from "react-router-dom";
function ComparePage() {
    const {username}=useParams();
    const [loggedinUserData,setLoggedInUserData]=useState([]);
    const[compareUserDAta,setCompareUserData]=useState([]);
    const[loggedInGraphUserData,setLoggedInUserDta]=useState([]);
    const [compareUserGraphData,setCompareUserGraphData]=useState([]);


    const getData = async()=>{
    
        const userUID = await getUID();
        const {uid} = auth.currentUser;
        const resultRef = db.collection('Results');
        let tempData = [];
        let tempGraphData = [];

        resultRef.where('userId','==',uid).orderBy('timeStamp','desc').get().then((snapshot)=>{
            snapshot.docs.forEach((doc)=>{
                tempData.push({...doc.data()});
                tempGraphData.push([doc.data().timeStamp,doc.data().wpm]);
                setLoggedInUserData(tempData);
                setLoggedInUserDta(tempGraphData);
            });
        });


    const getUID=async()=>{
        const ref=db.collection('usernames').doc(`${username}`);
        const res=await ref.get();
        return res.data().uid;
    }
    let tempData1 = [];
    let tempGraphData1 = [];
    resultRef.where('userId','==',userUID).orderBy('timeStamp','desc').get().then((snapshot)=>{
        snapshot.docs.forEach((doc)=>{
            tempData1.push({...doc.data()});
            tempGraphData1.push([doc.data().timeStamp,doc.data().wpm]);
            setCompareUserData(tempData1);
            setCompareUserGraphData(tempGraphData1);
        });
    });
}

useEffect(()=>{
    getData();
},[]);
  return (
    <div>
        <Graph graphData={loggedInGraphUserData} typ='date'/>
        <Graph graphData={compareUserGraphData} typ='date'/>

    </div>
  )
}

export default ComparePage