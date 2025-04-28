import { useState } from "react";
import "../styles/TaskChart.css";
import "../styles/SingleTask.css"

//Componente que contiene el titulo y el cuerpo de la tarjeta de tareas primarias y secundarias
export default function TaskChart({ title, children }) {
    return (
        <div className="card card-task-chart">
            <div className="card-header text-center">
                <h4>{title}</h4>
            </div>
            <div className="card-body">
                {children}
            </div>
        </div>
    )
}
//Componente que contiene cada tarea primaria o secundaria individualmente cuando se agregan a la lista de tareas
//Recibe como props el id de la tarea, el texto de la tarea, el titulo de la tarjeta, y las funciones para eliminar y editar tareas
export function SingleTask({ task, taskId, titleCard, deleteTaskP, deleteTaskS, isEditingP, setEditingIdP, isEditingS, setEditingIdS, updateTaskP, updateTaskS }) {
    const [newPrimaryTask, setNewPrimaryTask] = useState(task);
    const [newSecondaryTask, setNewSecondaryTask] = useState(task);
    //Funcion para editar una tarea primaria al presionar el boton de "Modificar"
    const handleEditClickPrimaryTask = () => {
        setEditingIdP(taskId);
        setNewPrimaryTask(task);
    }
    //Funcion para editar una tarea secundaria al presionar el boton de "Modificar"
    const handleEditClickSecondaryTask = () => {
        setEditingIdS(taskId);
        setNewSecondaryTask(task);
    }
    //Funcion que permite guardar los cambios efectuados sobre una tarea primaria al haberla modificado previamente
    const handleSaveClickPrimaryTask = () => {
        if (newPrimaryTask.trim()) {
            updateTaskP(taskId, newPrimaryTask);
        }
    }
    //Funcion que permite guardar los cambios efectuados sobre una tarea secundaria al haberla modificado previamente
    const handleSaveClickSecondaryTask = () => {
        if (newSecondaryTask.trim()) {
            updateTaskS(taskId, newSecondaryTask);
        }
    }
    return (
        <div className="card card-single-task mb-2">
            <div className="card-body">
                <div className="row gx-1">
                    <div className="form-check container">
                        <input id="task" type="checkbox" className="form-check-input" />
                        {
                            isEditingP //Estado proveniente del componente "Content.jsx" para activar modificacion de tareas primarias pasado como prop
                                ?
                                <textarea
                                    type="text"
                                    className="form-control"
                                    value={newPrimaryTask}
                                    onChange={(e) => setNewPrimaryTask(e.target.value)} />
                                :
                                isEditingS //Estado proveniente del componente "Content.jsx" para activar modificacion de tareas secundarias pasado como prop
                                    ?
                                    <textarea
                                        type="text"
                                        className="form-control"
                                        value={newSecondaryTask}
                                        onChange={(e) => setNewSecondaryTask(e.target.value)} />
                                    :
                                    <p htmlFor="task" className="form-check-label">{task}</p>
                        }
                    </div>
                </div>
                <hr />
                <div className="row row-options gx-1 text-center">
                    <div className="col-12 col-text-options text-center">
                        <p>Presiona o sitúa el cursor aquí para ver opciones de la tarea</p>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6 pb-1">
                        {
                            isEditingP
                                ?
                                <button className="btn btn-task-modify w-100" onClick={handleSaveClickPrimaryTask}>Guardar</button>
                                :
                                isEditingS
                                    ?
                                    <button className="btn btn-task-modify w-100" onClick={handleSaveClickSecondaryTask}>Guardar</button>
                                    :
                                    (
                                        titleCard === "P"
                                            ?
                                            <button className="btn btn-task-modify w-100" onClick={handleEditClickPrimaryTask}>Modificar</button>
                                            :
                                            <button className="btn btn-task-modify w-100" onClick={handleEditClickSecondaryTask}>Modificar</button>
                                    )
                        }
                    </div>
                    <div className="col-sm-12 col-md-6 col=lg-6">
                        {
                            titleCard === "P"
                                ?
                                <button onClick={deleteTaskP} className="btn btn-task-delete w-100">Borrar</button>
                                :
                                <button onClick={deleteTaskS} className="btn btn-task-delete w-100">Borrar</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}