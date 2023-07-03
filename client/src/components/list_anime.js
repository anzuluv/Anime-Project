import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Axios from "axios";
import Title from './title.js'


function onlyUnique(val,index,self){
    return self.indexOf(val) === index;
}

function FindAnime(props) {
        
    return (
    
        props.list.map((character) => {
        if (character.anime === props.name) {    
    
        return (
        <div key={character.name}>
        <Link to={`/AvePL_find/${character.anime}/${character.name}/${character.state}`}>{character.name}</Link>
        </div>
          
        
        
        );
        }
    })
     

    
)
}

function List_anime() {
    const [listofCharacters, setListofCharacters] = useState([]);
    useEffect(()=> {
      Axios.get("http://localhost:3001/getCharacters").then((response) => {
        setListofCharacters(response.data)
      })
    },[]);
    
    const anime_list = listofCharacters.map(character => character.anime)
    const unique = anime_list.filter(onlyUnique)
    listofCharacters.sort()


    const anime_view = () => {
        return(
            unique.map((anime) => {
                return (
                <details key={anime}> <summary className='font-medium text-xl hover:text-slate-400'>{anime}</summary>
                 <FindAnime name={anime} list={listofCharacters}/>
                
             </details>);
            }))
    
    }
    var anime_div = anime_view();
    return(
        <div className="container text-white" style={{marginTop:"50px"}}>
        <Title>Anime</Title>
        {anime_div}
        
     </div>
        
    );    
}

export default List_anime;
