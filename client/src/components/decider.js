import React, { useState, useEffect} from "react";
import Axios from "axios";
import Button from './button.js';
import Title from './title.js';
import Select from './select.js';

function Decider(props) {
    const [name1, setName1] = useState("");
    const [anime1, setAnime1] = useState("");
    const [state1, setState1] = useState("");
    const [name2, setName2] = useState("");
    const [anime2, setAnime2] = useState("");
    const [state2, setState2] = useState("");

    const [listofCharacters, setListofCharacters] = useState([]);
    useEffect(()=> {
        Axios.get("http://localhost:3001/getStates").then((response) => {
          setListofCharacters(response.data)
        });
      
      },[]);

      useEffect(()=> {
        function changeOptions()   { 
            let names_jsons = listofCharacters.filter(function(character) {
                return character.anime === anime1;})
            setNames1([...new Set(names_jsons.map(character => character.name))]);    
       
    
            let names_jsons2 = listofCharacters.filter(function(character) {
                return character.anime === anime2;})
            setNames2([...new Set(names_jsons2.map(character => character.name))]);    
    
      
            let names_jsons3 = listofCharacters.filter(function(character) {
                return character.name === name1 && character.anime === anime1;})
            setStates1([...new Set(names_jsons3.map(character => character.state))]);    
       
      
            let names_jsons4 = listofCharacters.filter(function(character) {
                return character.name === name2 && character.anime === anime2;})
            setStates2([...new Set(names_jsons4.map(character => character.state))]);    
            }

        changeOptions();
      
      },[anime1,anime2,name1,name2]);


    

    const animes = [...new Set(listofCharacters.map(character => character.anime))];
    const [names1,setNames1] = useState([]);
    const [names2, setNames2] = useState([]);
    const [states1, setStates1] = useState([]);
    const [states2, setStates2] = useState([]);
    
    
    


        
    var key = "";
    const [message,setMessage] = useState("");

    const Decide = async () => {
        var response1 = {};
        var response2 = {};

        let power_map = {
            "S": 4,
            "A": 3,
            "B": 2,
            "C": 1,
            "D": 0
        }

        await Axios.get(`http://localhost:3001/AvePL_find/${anime1}/${name1}/${state1}`)
        .then(response => {
            response1 = response.data;          
        });

        await Axios.get(`http://localhost:3001/AvePL_find/${anime2}/${name2}/${state2}`)
        .then(response => {
            response2 = response.data;          
        });
        console.log(response1);
        console.log(response2);
        let level1 = "";
        let level2 = "";
        var mult_pwrs = [];
        var converted = [];

      if (response1[0].ave_pl in power_map && response2[0].ave_pl in power_map){  
        level1 = power_map[response1[0].ave_pl];
        level2 = power_map[response2[0].ave_pl];
    }
    else if (!(response1[0].ave_pl in power_map)) {
        mult_pwrs = response1[0].ave_pl.split(',');
        converted = mult_pwrs.map((letter)=>power_map[letter]);
        level1 = Math.max(...converted);
        level2 = power_map[response2[0].ave_pl];
    }
    else if (!(response2[0].ave_pl in power_map)) {
        level1 = power_map[response1[0].ave_pl];
        mult_pwrs = response2[0].ave_pl.split(',');
        converted = mult_pwrs.map((letter)=>power_map[letter]);
        level2 = Math.max(...converted);
        
    }
    console.log("level1");
    console.log(level1);
    console.log("level2");
    console.log(level2);
     
      if (level1>level2){
        setMessage(response1[0].name + " won!");
      } 
      else if (level1<level2) {
        setMessage(response2[0].name + " won!");
      } 
      else {
        setMessage(response1[0].name + " and " + response2[0].name + " tied!");
      }
    }

    let anime_options = animes.map(anime => { return {"label":anime,"value":anime, "disabled":false}});
    anime_options.unshift({"label":"Anime","value":"", "disabled":true});

    let name1_options = names1.map(name => {return {"label":name,"value":name,"disabled":false}});
    name1_options.unshift({"label": "Name", "value":"", "disabled":true});

    let state1_options = states1.map(state => {return {"label":state, "value":state, "disabled":false}});
    state1_options.unshift({"label": "State", "value":"", "disabled":true});

    let name2_options = names2.map(name => {return {"label":name,"value":name,"disabled":false}});
    name2_options.unshift({"label": "Name", "value":"", "disabled":true});

    let state2_options = states2.map(state => {return {"label":state, "value":state, "disabled":false}});
    state2_options.unshift({"label": "State", "value":"", "disabled":true});


    return(
        <div className="container overflow-x-auto">
            <h1 className="text-white text-3xl font-medium">{message}</h1>
            <Title>Who would win?</Title>
            <div className="decider">
                <div>
            <h4 className="text-xl font-medium text-white p-2">Character 1</h4>
           <div className="flex space-x-4">
        
        <Select options={anime_options} value={anime1} onChange = {(event) => {
            setAnime1(event.target.value);
            setName1("");
            setState1("");
        }}/>

        <Select options={name1_options} value={name1} onChange = {(event) => {
            setName1(event.target.value);
        }}/>
           
        <Select options={state1_options} value={state1} onChange = {(event) => {
            setState1(event.target.value);
        }}/>
        
        </div> 
        </div>

        <div>
        <h4 className="text-xl font-medium text-white p-2">Character 2</h4>
        <div className="flex space-x-4">
        <Select options={anime_options} value={anime2} onChange = {(event) => {
            setAnime2(event.target.value);
            setName2("");
            setState2("");
        }}/>

        <Select options={name2_options} value={name2} onChange = {(event) => {
            setName2(event.target.value);
        }}/>
           
        <Select options={state2_options} value={state2} onChange = {(event) => {
            setState2(event.target.value);
        }}/>

        </div>
        </div>
 

        </div>

        <Button onClick={Decide}>Submit </Button>
        </div>
    )
}

export default Decider;