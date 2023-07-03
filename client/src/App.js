import './App.css';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Home from "./Pages/Home";
import  Character from "./Pages/Character";
import ErrorPage from "./Pages/Error";

function App() {
  return (<Router>
    <nav className='text-primary text-center text-4xl font-bold p-4 hover:text-zinc-400 bg-db'>
      <Link to="/"> Home </Link>
    </nav>
    <div className='bg-[url("https://www.seekpng.com/png/full/132-1326686_creepy-yuno-anime-banners-de-youtube.png")] h-96 w-full bg-cover bg-center p-20'>

            </div>
    <Routes> 
      <Route path="/" element={<Home />} />
      <Route path= "/AvePL_find/:anime/:name/:state" element={<Character />} />
      <Route path="*" element={<ErrorPage />}/>
    </Routes>
    <div> Footer</div>
 </Router> );
 
}           
export default App;
