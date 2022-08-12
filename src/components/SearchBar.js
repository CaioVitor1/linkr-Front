import styled from "styled-components"
import { DebounceInput } from "react-debounce-input"
import { useState } from "react"
import axios from "axios";

export default function SearchBar(){

    const [searchBarValue, setSearchBarValue] = useState("");

    async function searchUsers(value){
        setSearchBarValue(value);

        const listUsers = await axios.get(`http://localhost:4000/users/?search=${value}`);

        console.log("listUsers: ");
        console.log(listUsers.data);
    }

    return(
    <>
    <DebounceInput element={SearchBarInput}
    minLength={3}
    debounceTimeout={300}
    onChange={event => searchUsers(event.target.value)}
    type={"text"} 
    placeholder="Search for people">
    </DebounceInput>
    </>)
}


const SearchBarInput = styled.input`
    width: 40%;
    height: 60%;

    background: #FFFFFF;
    border-radius: 8px;

    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;
    color: #C6C6C6;
`