import React, { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

function Character() {
    const { name, anime,state } = useParams();
    const [person, setperson] = useState([]);
    useEffect(()=> {
        Axios.get(`http://localhost:3001/AvePL_find/${anime}/${name}/${state}`).then((response) => {
          setperson(response.data)
        })
      },[]);
     
    console.log(person)
    
    return (
     
    <div className="flex flex-col min-h-screen items-center">
       <div className="container">        
        <h1 className="text-db text-2xl font-bold">This is the page for { name }.</h1>
        
        <div className="text-white text-center font-medium flex flex-col space-y-12 text-xl p-4">
            <h2>Anime: {anime}</h2>
            <h2>Name: {name}</h2>
            {person.map((character) => {
                return (
                    
                <div key={character.state} className="flex flex-col space-y-12">
                    <h2>State: {character.state}</h2>
                    <h2>Average Power Level: {character.ave_pl}</h2>
                </div>
                );
            })}
                       
            </div>
            </div>

    </div>
    )}

export default Character;