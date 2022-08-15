import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Trending(){

    const [listTrendingData, setListTrendingData] = useState([]);
    const navigate = useNavigate();
    const localToken = localStorage.getItem("token");

    
    useEffect(() => {
        getTrendingData();
    }, [listTrendingData]);


    async function getTrendingData(){

        const config = {
            headers: {
                Authorization: `Bearer ${localToken}`
            }
        }

        try{
            const trendingData = await (await axios.get('http://localhost:4000/trendingRanking', config)).data;

            if(!trendingData){
                console.log("Problema ao obter trending");
            }

            console.log("resposta trendingData: " );
            console.log(trendingData);

            setListTrendingData([...trendingData]);

        }catch(error){
            console.log(error);
        }
    }

    function clickHashtag(hashtag){
        navigate(`/hashtag/${hashtag}`);
    }

    return(
        <TrendingContainer>
            <span>trending</span>
            <hr />
            <TrendingRanking>
                {listTrendingData.map((hashtag, index) => <p onClick={() => clickHashtag(hashtag.hashtag)} key={index}>{hashtag.hashtag}</p>)}
            </TrendingRanking>
        </TrendingContainer>
    );
}


const TrendingContainer = styled.div`
    width: 60%;
    height: 60vh;
    background-color: #171717;
    border-radius: 16px; 

    span{
        margin: 20px 20px;
        font-family: 'Oswald';
        font-style: normal;
        font-weight: 700;
        font-size: 27px;
        line-height: 40px;
        color: #FFFFFF;
    }

    hr{
        height: 2px;
        width: 100%;
        color: #484848;
        background-color: #484848;
        border: 1px solid #484848;
    }
`
const TrendingRanking = styled.div`
    margin: 20px 20px;


    p{
        margin-top: 3%;
        font-family: Lato;
        font-size: 19px;
        font-weight: 700;
        line-height: 23px;
        letter-spacing: 0.05em;
        text-align: left;
        color: #FFFFFF;

        cursor: pointer;
    }
`