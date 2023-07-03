import React, { useState, useEffect} from "react";
import Axios from "axios";


function Update(props) {
    const [character, setCharacter] = useState([]);
    useEffect(()=> {
      Axios.get(`http://localhost:3001/AvePL_find/${props.anime}/${props.name}/${props.state}`).then((response) => {
        setCharacter(response.data)
      })
    },[]);


    console.log(character)
}

export default Update;

// CharacterModel.aggregate([
//     {
//         $group : {
//             _id: {
//                 "name": "$name",
//                 "anime": "$anime",
//                 "state": "$state",
//             },
//         }
//     }
// ])