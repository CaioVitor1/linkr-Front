import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function HashtagPosts(){
    const { hashtagName } = useParams();
    const [listHashtagPosts, setListHashtagPosts] = useState([]);

    useEffect(() => {
        getHashtagPosts();
    }, []);


    async function getHashtagPosts(){

        try{
            const hashtagPosts = await (await axios.get(`http://localhost:4000/hashtag/${hashtagName}`)).data;

            if(!hashtagPosts){
                console.log("Problema ao obter trending");
            }

            console.log("resposta getHashtagPosts: " );
            console.log(hashtagPosts);

            setListHashtagPosts([...hashtagPosts]);

        }catch(error){
            console.log(error);
        }

    }

    return("post " + hashtagName);
}