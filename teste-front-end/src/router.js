import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Task from './pages/Task';

function  RoutesApp(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Home/> } />
                <Route path="/task/:userId" element={ <Task/> } />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;