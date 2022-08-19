import axios from "axios";
import jwt from "jwt-decode";
import { useState } from "react";
import styled from "styled-components";
import send from "../assets/send.png"

export default function WriteAComment({postId, commentsList, setCommentsList}){
    const localToken = localStorage.getItem("token");
    const userData = jwt(localToken);
    const [commentData, setCommentData] = useState("");

    const config = {
        headers: {
            Authorization: `Bearer ${localToken}`
        }
    }

    async function commentPost(){
        const body = { comment: commentData, postId, userId: userData.id };

        try{
            await axios.post(`https://projeto-linkr-back.herokuapp.com/addComment`, body, config);
        }catch(error){
            console.log(error);
        }

        await getCommentListData();
        setCommentData("");
      }

    async function pressEnter(e){
        if(e.key === "Enter") {
        //console.log("postId: " + postId);
        //console.log(e);

        await commentPost();
        await getCommentListData();
        }
    }

    async function getCommentListData(){

        try{
            const listCommentsData = await (await axios.get(`https://projeto-linkr-back.herokuapp.com/listComments/${postId}`, config)).data;

            setCommentsList([...listCommentsData]);
        }catch(error){
            console.log(error);
        }
    }
            

    return(
        <ContainerWriteComment>
            <img src={userData.image} alt="" />
            <InputCommentContainer>
            <InputComment placeholder="write a comment" className="icon" value={commentData} onChange={(e) => setCommentData(e.target.value)} onKeyDown={pressEnter}>
            </InputComment>
            <img onClick={commentPost} src={send} alt="" />
            </InputCommentContainer>
        </ContainerWriteComment>
    );
}



const ContainerWriteComment = styled.div`
    height: 10vh;
    margin-bottom: 3vh;
    background-color: #1e1e1e;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    padding-left: 25px;
    padding-right: 15px;

    img{
        width: 40px;
        height: 40px;
        border-radius: 100%;
        margin-right: 10px;
    }
`

const InputComment = styled.input`
    width: 100%;
    height: 60%;
    background-color: #252525;
    padding: 20px;
    border-radius: 8px;
    justify-self: flex-end;
`
const InputCommentContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    img{
        position: absolute;
        margin-right: 15px;
        right: 0;
        width: 15px;
        height: 15px;
    }
`

