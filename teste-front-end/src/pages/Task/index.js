import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../service/api';
import './task.css'

function Tarefa() {

    const { id } = useParams();
    const [tasks, setTasks] = useState([]);
    const[loading, setLoading] = useState(true);
    const [titleTask, setTitleTask] = useState('');

    useEffect(() => {

        async function loadTodo() {
            await api.get(`/users/${id}/todos`)
                .then((response) => {
                    setTasks(response.data);
                    setLoading(false);
                })
        }
        loadTodo()
    }, [])

    async function postTodo() {
        if(titleTask && titleTask.length > 0){
            const response = await api.post(`/todos`, { "userId": id, "title": titleTask, "completed": false })
            setTasks([...tasks, response.data]);
            setTitleTask('');
        }else{
            alert("Preencha o campo")
        }
        

    }

    
    
    if(loading){
        return(
            <div className='loading'>
                <h2>Carregando os usuários...</h2>
            </div>
        )
    }

    return (
            <div className='container-task'>
                <h1>Nova Tarefa</h1>
                <div className='container-newTask'>
                    <input className='title-tarefa' type="text" placeholder="Digite uma nova tarefa" onChange={(e) => setTitleTask(e.target.value)} />
                    <button className='button-add' onClick={postTodo}>Adicionar</button>
                </div>

                <h2>Todas as Tarefas</h2>
                {tasks.map((task) => {
                    return (
                        <div key={task.id} className="list">
                            <p>-{task.title}</p>
                            <form>
                                <input type="radio" id="comp" name="fav_language" value="COMPLETO" defaultChecked={task.completed ? true : false}/>
                                <label htmlFor="comp"> COMPLETA </label>
                                <input type="radio" id="pend" name="fav_language" value="PENDENTE" defaultChecked={!task.completed ? true: false}/>
                                <label htmlFor="pend"> PENDENTE </label>
                            </form>
                        </div>
                    )
                })}
                <Link to={`/`} className="link-home">Home</Link>
            </div>
    )
}

export default Tarefa;