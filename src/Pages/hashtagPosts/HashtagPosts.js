import { useParams } from "react-router-dom";

export default function HashtagPosts(){
    const { hashtagName } = useParams();

    return("post " + hashtagName);
}