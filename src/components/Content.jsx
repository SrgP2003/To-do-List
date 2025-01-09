import "../styles/Content.css";
import TaskChart from "./TasksTools";
import "../styles/TaskChart.css";
import { useState } from "react";

export default function Content() {
    const [tasks, setTasks] = useState(""); //Estado para capturar las tareas que se digiten en el textarea
    const [isPriority, setIsPriority] = useState(false); //Estado para capturar si la tarea es prioridad o no
    const [primaryTasks, setPrimaryTasks] = useState([]); //Estado para guardar las tareas con prioridad
    const [secondaryTasks, setSecondaryTasks] = useState([]); //Estado para guardar las tareas sin prioridad

    const handleClickAddTask = () => { //Funcion que sera aplicada sobre el boton para agregar tareas
        if (!tasks.length || !secondaryTasks.length) { //Validacion para que no se agreguen tareas vacias
            alert("Por favor, escriba una tarea");
        }
        if (isPriority)
            setPrimaryTasks([...primaryTasks, tasks]);
        else {
            setSecondaryTasks([...secondaryTasks, tasks]);
        }
        setTasks("");
    }
    const handleClickErasePrimaryTask = () => { //Funcion que sera aplicada sobre el boton para borrar tareas -> REVISAR LUEGO
        if(!primaryTasks)
            alert("No hay tareas para borrar");
        setPrimaryTasks(primaryTasks.filter((task, index) => index !== primaryTasks.length - 1));   
    }
    return (
        <>
            <main className="main-content">
                <header className="text-center">
                    <div className="div-lg text-center p-2">
                        <h1 className="display-1">To-do List</h1>
                    </div>
                    <h2 className="h2-md-task">¿Qué te gustaría hacer el día de hoy?</h2>
                </header>
                <section className="container">
                    <article className="row">
                        <div className="col-12">
                            <div className="div-lg-task-container">
                                <textarea value={tasks} onChange={e => setTasks(e.target.value)} id="textarea-tasks" rows="4" className="form-control mb-2" placeholder="Escribe algo..."></textarea>
                                <hr />
                                <div className="row div-md-task-buttons">
                                    <div className="col-sm-12 col-md-6 col-lg-6 div-md-button d-flex justify-content-center">
                                        <button onClick={handleClickAddTask} className="btn btn-add">Agregar</button>
                                    </div>
                                    <div className="col-sm-12 col-md-6 col-lg-6 form-check-priority form-check form-switch d-flex align-items-center justify-content-center">
                                        <div className="row">
                                            <div className="col-3">
                                                <input checked={isPriority} onChange={e => setIsPriority(e.target.checked)} title="Marcar actividad como prioridad" className="form-check-input" type="checkbox" role="switch" />
                                            </div>
                                            <div className="col-9 ">
                                                <label className="form-check-label">PRIORIDAD</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                    </article>
                    <article className="row">
                        <div className="ul-priority col-md-12 col-lg-6">
                            <TaskChart title={"Mis mayores prioridades"}> {/* Se implementan las tareas con prioridad */}
                                <ul>
                                    {
                                        primaryTasks.map((task, index) => (
                                            <li key={index}>{task}</li>
                                        ))
                                    }
                                </ul>
                            </TaskChart>
                        </div>
                        <div className="ul-secondary col-md-12 col-lg-6">
                            <TaskChart title={"Sin prioridad pero necesarias"}> {/* Se implementan las tareas sin prioridad */}
                                <ul>
                                    {
                                        secondaryTasks.map((task, index) => (
                                            <li key={index}>{task}</li>
                                        ))
                                    }
                                </ul>
                            </TaskChart>
                        </div>
                    </article>
                </section>
            </main>
        </>
    )
}