import React from 'react';
import { Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import { CircularProgress } from '@material-ui/core'
import { useAuthState } from 'react-firebase-hooks/auth';
import Graph from '../Component/Graph';
import { db, auth } from '../firebaseConfig';
import { useTheme } from '../Context/ThemeContext';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
function UserPage() {
    const{theme}=useTheme();
 const[dataLoading,setDataLoading]=useState([]);
 const[data,setData]=useState([]);
 const[graphData,setGraphData]=useState([]);
 const[user,loading]=useAuthState(auth);
 console.log(loading,"loading");
 const fetchUserData=()=>{
  const resRef=db.collection('Results');
  console.log(resRef);
  let tempData = [];
  let tempGraphData = [];
  const {uid} = auth.currentUser;
  resRef.where('userId','==',uid).orderBy('timeStamp','desc').get().then((snapshot)=>{   
    console.log(snapshot,'snapshot'); 
    snapshot.docs.forEach((doc)=>{
        tempData.push({...doc.data()});
        tempGraphData.push([doc.data().timeStamp,doc.data().wpm]);
    });
    setData(tempData);
    setGraphData(tempGraphData.reverse());
    setDataLoading(false);
});
 }
 useEffect(()=>{
  if(!loading){
    console.log('hellow');
      fetchUserData();
  }
},[loading]);


if(loading||dataLoading){
  return (
    <div className="center-screen">
        <CircularProgress size={100} color={theme.title}/>
    </div>
  
  );
}
 console.log(data,'data');
  return (
    <div className="canvas">
       
        <div className="users-profile">
            <div className="user">
                <div className="user-picture">
                    <SupervisorAccountIcon style={{display:'block',transform:'scale(5)',margin:'auto',marginTop:'3.5rem'}}/>
                </div>
                <div className="userinfo">
                    <div className="email">
                        {user.email}
                    </div>
                    <div className="joined-on">
                        {user.metadata.creationTime}
                    </div>
                </div>
            </div>
            <div className="totaltimes">
                <span>
                    Total Test Taken {data.length}
                </span>
            </div>
        </div>

        <div className="result-graph">
            <Graph graphData={graphData} type='date'/>
        </div>
    
    <div className="table">
        <TableContainer style={{maxHeight:'30rem'}}>
            <Table>
                <TableHead> 
                    <TableRow>  
                        <TableCell  style={{color: theme.title, textAlign: 'center'}}>
                            WPM
                        </TableCell >
                        <TableCell  style={{color: theme.title, textAlign: 'center'}}>
                            Accuracy
                        </TableCell>
                        <TableCell  style={{color: theme.title, textAlign: 'center'}}>
                            Date
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(i=>(
                        <TableRow>
                            <TableCell style={{color: theme.title, textAlign: 'center'}}>
                                {i.wpm}
                            </TableCell>
                            <TableCell style={{color: theme.title, textAlign: 'center'}}>
                                {i.accuracy}
                            </TableCell>
                            
                            <TableCell style={{color: theme.title, textAlign: 'center'}}>
                                {i.timeStamp.toDate().toString()}
                            </TableCell>
                        </TableRow>
                    ))}

                </TableBody>
            </Table>
        </TableContainer>
    </div>
</div>
  )
}

export default UserPage