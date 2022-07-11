import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../service/api';
import './task.css'

function Tarefa() {

    const { id } = useParams();
    const [tasks, setTasks] = useState([]);
    const [titleTask, setTitleTask] = useState('');

    useEffect(() => {

        async function loadTodo() {
            await api.get(`/users/${id}/todos`)
                .then((response) => {
                    setTasks(response.data);
                })
        }
        loadTodo()
    }, [])

    async function postTodo() {
        await api.post(`/todos`, { "userId": id, "title": titleTask, "completed": true })

    }
    postTodo();

    return (
            <div className='container-task'>
                <h1>Nova Tarefa</h1>
                <div className='container-newTask'>
                    <input className='title-tarefa' type="text" value={titleTask} onChange={(e) => setTitleTask(e.target.value)} />
                    <button>Adicionar</button>
                </div>

                <h2>Todas as Tarefas</h2>
                {tasks.map((task) => {
                    return (
                        <div key={task.id} className="list">
                            <p>-{task.title}</p>
                            <form>
                                <input type="radio" id="comp" name="fav_language" value="COMPLETO" />
                                <label for="comp"> COMPLETA </label>
                                <input type="radio" id="pend" name="fav_language" value="PENDENTE" />
                                <label for="pend"> PENDENTE </label>
                            </form>
                        </div>
                    )
                })}
                <Link to={`/`} className="link-home">Home</Link>
            </div>
    )
}

export default Tarefa;