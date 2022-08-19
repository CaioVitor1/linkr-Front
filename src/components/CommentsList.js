import axios from "axios";
import { useState, useEffect } from "react";
import jwt from "jwt-decode";
import Comment from "./Comment";
import styled from "styled-components";

export default function CommentsList({postId, commentsList, setCommentsList, postUserId, anyFollow}){
    //const [commentsList, setCommentsList] = useState([]);
    const localToken = localStorage.getItem("token");
    const userData = jwt(localToken);

    const config = {
        headers: {
            Authorization: `Bearer ${localToken}`
        }
    }

    useEffect(() => {
        getCommentListData();
    }, []);


    async function getCommentListData(){

        try{
            const listCommentsData = await (await axios.get(`https://projeto-linkr-back.herokuapp.com/listComments/${postId}`, config)).data;

            console.log(listCommentsData);

            setCommentsList([...listCommentsData]);
        }catch(error){
            console.log(error);
        }
    }

    return(commentsList.map(comment => <><span><Comment anyFollow={anyFollow} postUserId={postUserId} comment={comment.comment} userName={comment.name} userImage={comment.image} postId={comment.postId} userId={comment.userId}/></span></>));
}
