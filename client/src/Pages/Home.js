// import React, { useState, useEffect} from 'react';
// import { Link } from 'react-router-dom';
// import Axios from "axios";
import List_anime from "../components/list_anime"
import Add from "../components/add_char"
import Decider from "../components/decider"
import '../index.css';



function Home() {
    document.body.classList.add('bg-teal');
      
    return (
        <div>
            
        <div className="flex flex-col min-h-screen items-center">
           
            <Decider/>
            <Add/>
            <List_anime/>
        </div>
        </div>
    );
}


export default Home;
