import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function HashtagPosts(){
    const { userId } = useParams();
    const [listUserPosts, setListUserPosts] = useState([]);

    useEffect(() => {
        getUserPosts();
    }, []);


    async function getUserPosts(){

        try{
            const userPosts = await (await axios.get(`http://localhost:4000/user/${userId}`)).data;

            if(!userPosts){
                console.log("Problema ao obter trending");
            }

            console.log("resposta userPosts: " );
            console.log(userPosts);

            setListUserPosts([...userPosts]);

        }catch(error){
            console.log(error);
        }

    }

    return("user: " + userId);
}