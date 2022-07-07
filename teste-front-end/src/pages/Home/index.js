import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import api from '../../service/api'

function Home(){

    const[user, setUser] = useState([]);
    const[loading, setLoading] = useState(true);

    useEffect(()=> {
        async function loadTask(){
            const response = await api.get("users")
            setUser(response.data)
            setLoading(false)
        }

        loadTask();

    }, [])
    

    if(loading){
        return(
            <div className='loading'>
                <h2>Carregando os usuários...</h2>
            </div>
        )
    }

    return(
        <div className='container'>
            <div className='todo-list'>
            <h1 className='title'>Lista de Tarefas:</h1>
                <p className='users'>Usuários:</p>
                {user.map((user)=>{
                    return(
                        <p key={user.id}>
                            <Link to={`/task/${user.id}`}>{user.name}</Link>
                        </p>
                    )
                })}
            </div>
        </div>
    )
}

export default Home;