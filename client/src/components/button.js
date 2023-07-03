

function Button(props) {
    return(
        
        <button onClick={props.onClick} className="bg-egg text-db font-medium px-4 py-2 rounded hover:bg-zinc-400" style={{marginTop:"50px"}}>{props.children} </button>
    )
}

export default Button;