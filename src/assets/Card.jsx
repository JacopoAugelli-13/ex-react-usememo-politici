import { useState, useEffect, useMemo } from 'react'
import './Card.css'

const Card = () => {
    const [user, setUser] = useState([]);
    const [text, setText] = useState("");


    useEffect(() => {
        fetch('http://localhost:3333/politicians')
            .then(res => res.json())
            .then(data => setUser(data))
            .catch(err => console.error("dati non trovati", err));
    }, [])

    const handleInput = e => {
        setText(e.target.value);
    }

    const arrFiltrato = useMemo(() => {
        return user.filter((val) => {
        const politicoRitornato = (val.name.toLowerCase().includes(text) || val.biography?.toLowerCase().includes(text));
        return politicoRitornato;
        });
    }, [user, text]);

    return (
        <>
            <div className="simpleContainer"> 
                <input type="text" value={text} onChange={handleInput} placeholder='Ricerca politici'/>
                {arrFiltrato.map((val, ind) => (
                    <div className="card" key={val.id || ind}>
                        <div>
                            <h1>{val.name}{console.log("Render Card:", val.name )}</h1>
                            <img src={val.image}></img>
                            <p>{val.country}</p>
                            </div>
                                <br />
                            <div>
                                <h2>{val.position}</h2>
                                <p>{val.biography}</p>
                            </div>
                    </div>
                    ))}
            </div>
        </>
    )
    
}

export default Card;