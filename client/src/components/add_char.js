import React, { useState, useEffect} from 'react';
import Axios from "axios";
import Button from './button.js';
import Title from './title.js';
import Select from './select.js';
import Input from './input.js';


function Add(props) {
    
    const [name, setName] = useState("");
    const [anime, setAnime] = useState("");
    const [power_level, setPower_level] = useState("");
    const [state, setState] = useState("");
    const [listofCharacters, setListofCharacters] = useState([]);


    useEffect(()=> {
      Axios.get("http://localhost:3001/getCharacters").then((response) => {
        setListofCharacters(response.data)
      });
    },[]);


    const Add_char = () => {
        Axios.post("http://localhost:3001/createCharacter", {
        name,
        anime,
        power_level,
        state
        })
        .then((response) => {
            if (!listofCharacters.includes({
                name,
                anime,
                power_level,
                state
                })) {
            setListofCharacters([
            ...listofCharacters,
            {
            name,
            anime,
            power_level,
            state
            },
        ]);
    } })
    .then((response) => {
        Test();
        setName('');
        setAnime('');
        setState('');
    });
        
        
            }
    

    const max_count = (arr, prop) => {
        var max;
        for (var i=0; i<arr.length; i++) {
            if (!max || parseInt(arr[i][prop]) > parseInt(max[0][prop])) {
            max = [arr[i]];
        }
         else if (parseInt(arr[i][prop]) === parseInt(max[0][prop])) {
            max.push(arr[i]);
        }
        
    }
        const power_levels = max.map(pls => pls.power_level);
        // console.log(power_levels)
        return power_levels;
    }

    const Test = async () => {
        var character = []
        await Axios.get(`http://localhost:3001/getCharacter/${anime}/${name}`).then((response) => {
            character = response.data;
            });
        

        var data = [];
        for (var i=0, numStates = character.length; i < numStates; i++) {
            if (character[i].state === state) {
                data = character[i]
            }
        }

        var ave_pl = "";
        data.power_levels.length === 1 ?
        ave_pl = power_level :
        max_count(data.power_levels,"count").length > 1 ?
        ave_pl = String(max_count(data.power_levels,"count")) :
        ave_pl = String(max_count(data.power_levels,"count")[0]);

               
        var temp = [];
        

        await Axios.get(`http://localhost:3001/AvePL_find/${anime}/${name}/${state}`)
        .then(response => {
            temp = response.data;
            
        });
        
        var id = null;
        console.log("temp",temp);

        if (!temp.length) {
            Axios.post(`http://localhost:3001/moveCharacter/`, {
            name,
            state,
            ave_pl,
            anime

        });
            
        } else {
            id = temp[0]._id;
            Axios.post(`http://localhost:3001/updateCharacter/`, {
            "id":id,
            "name": name,
            "anime" : anime,
            "ave_pl": ave_pl,
            "state": state

        });
            
        }
        
        

    }
 

    const [input, setInput] = useState("");
    
   

    const hideList = event =>{
        event.preventDefault();
        setInput(event.target.value);
        if (input.trim().length !== 0){
            event.target.setAttribute('list', event.target.getAttribute('data-list'))
        }
        else {
            event.target.removeAttribute('list')
        }
    }

    const animes = [...new Set(listofCharacters.map(character => character.anime))];
    const states = [...new Set(listofCharacters.map(character => character.state))];
    const names = [...new Set(listofCharacters.map(character => character.name))];

    let pwr_options = [
        {"label":"Power level", "value": "", "disabled":true},
        {"label":"A","value":"A","disabled":false},
        {"label":"B","value":"B","disabled":false},
        {"label":"C","value":"C","disabled":false},
        {"label":"D","value":"D","disabled":false},
    ]
    
    var key = "";
    return(
        <div className="container" style={{marginTop:"50px"}}>
            <Title>Add a character</Title>
            <div className='decider p-4'>
        <Input
            placeholder="Name"
            onChange={(event) => {
            setName(event.target.value);
            hideList(event);
        }}
            onClick= {hideList}
            data_list = "names-list"
            value={name}
        />
        <datalist id="names-list">
        {names.map((character,index) =>{
            key = character + index.toString();

                return(
                <option key={key} value={character}/>
                );
            })}
        </datalist>


        <Input
            placeholder="Anime"
            onChange={(event) => {
            setAnime(event.target.value);
            hideList(event);
            }}
            onClick= {hideList}
            data_list = "animes-list"
            value = {anime}
        />
        <datalist id="animes-list">
            {animes.map((anime,index) =>{
            key = anime + index.toString();

                return(
                <option key={key} value={anime}/>
                );
            })}
        </datalist>
            
            


            <Input
            placeholder="State"
            onChange={(event) => {
            setState(event.target.value);
            hideList(event);
            }}
            onClick= {hideList}
            data_list = "states-list"
            value = {state}
        />
        <datalist id="states-list">
            {states.map((state,index) =>{
                key = state + index.toString();

                return(
                <option key={key} value={state}/>
                );
            })}
        </datalist>
        </div>
        
        <div className='p-10'> <Select
        className='min-w-[200px]'
        options = {pwr_options}
        value={power_level}
        onChange = {(event) => {
            setPower_level(event.target.value);
        }}/></div>

        <Button onClick={Add_char}> Create Anime Character </Button>
        </div>


    );

    
    }
    export default Add;