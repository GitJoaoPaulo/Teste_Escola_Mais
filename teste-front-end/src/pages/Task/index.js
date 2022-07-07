import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../service/api';

function Tarefa(){

    const{userId} = useParams();
    const[tasks, setTasks] = useState({});

    useEffect(() => {
        async function loadTodo(){
            await api.get(`/todos/${userId}`)
            .then((response) => {
                console.log(response.data)
                setTasks(response.data);
            })
        }
        loadTodo()
    }, [])

    return(
        <div key={userId.id}>
            <p>{tasks.title}</p>
        </div>
    )
}

export default Tarefa;