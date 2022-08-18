import styled from "styled-components";
import axios from 'axios';

export default function Follow({profileId, follower,loadFollow,  setLoadFollow, following,setFollowing, localToken} ) {
    function addFollow() {
        setLoadFollow(true);
    console.log("chegou aqui")
        let body = {
          profileId: profileId,
          follower: follower
        }
        
        const config = {
          headers: {
              Authorization: `Bearer ${localToken}`
          }
      }
      console.log(body)
        const promise = axios.post("http://localhost:4000/follow", body, config)
        promise
        .then(res =>{       
          console.log("chegou aqui")
          console.log(res.data)
          setLoadFollow(false); 
          setFollowing(true)
        })
        .catch(err => {
            console.log(err);
            setLoadFollow(false); 
            alert("An error occured while trying add new follow")
        
        });
    
       }

       function removeFollow() {
        setLoadFollow(true)
        console.log(profileId)
        
        const config = {
          headers: {
              Authorization: `Bearer ${localToken}`
          }
      }
    
        const promise = axios.delete(`http://localhost:4000/follow/${profileId}`, config)
        promise
        .then(res =>{       
          console.log(res.data)
          setLoadFollow(false); 
          setFollowing(false)
        })
        .catch(err => {
            console.log(err);
            setLoadFollow(false); 
            alert("An error occured while trying unfollow, please refresh the page")
        
        });
       }
    return (
        <>
        {(profileId !== follower) && (loadFollow === false) && (following === false) && (<BeginFollow onClick={addFollow}> Follow</BeginFollow>)}
        {(profileId !== follower) && (loadFollow === false) && (following === true) && (<BeginUnfollow onClick={removeFollow}> Unfollow</BeginUnfollow>)}
        {(profileId !== follower) && (loadFollow === true) && (following === false) && (<UnFollow> Follow</UnFollow>)}
        {(profileId !== follower) && (loadFollow === true) && (following === true) && (<UnFollow> Unfollow</UnFollow>)}
        </>
    )
}

const BeginUnfollow = styled.button`
display: flex;
justify-content: center;
align-items: center;
width: 112px;
height: 31px;
background: white;
border-radius: 5px;
font-family: 'Lato';
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 17px;
color: blue;
`

const BeginFollow = styled.button`
display: flex;
justify-content: center;
align-items: center;
width: 112px;
height: 31px;
background: #1877F2;
border-radius: 5px;
font-family: 'Lato';
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 17px;
color: #FFFFFF;
`
const UnFollow = styled.button`
display: flex;
justify-content: center;
align-items: center;
width: 112px;
height: 31px;
background: gray;
border-radius: 5px;
font-family: 'Lato';
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 17px;
color: black;
`
