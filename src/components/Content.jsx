import "../styles/Content.css";
import TaskChart from "./TasksTools";
import { SingleTask } from "./TasksTools";
import "../styles/TaskChart.css";
import { useState } from "react";

export default function Content() {
    const [tasks, setTasks] = useState("");
    const [primaryTasks, setPrimaryTasks] = useState([]);
    const [secondaryTasks, setSecondaryTasks] = useState([]);
    const [priorityTask, setPriorityTask] = useState(false);

    //Logica para agregar tareas e identificar si esta es prioridad o no
    const handleClickAddTasks = () => {
        const objectPrimaryTasks = {
            id: primaryTasks.length + 1,
            taskP: tasks
        }
        const objectSecondaryTasks = {
            id: secondaryTasks.length + 1,
            taskS: tasks
        }

        if (tasks == "")
            alert("Por favor, ingresa una tarea");
        else {
            if (priorityTask) {
                setPrimaryTasks(primaryTasks => {
                    return (primaryTasks) ? [...primaryTasks, objectPrimaryTasks] : [objectPrimaryTasks];
                })
                setPriorityTask(false);
                setTasks("");
            }
            else {
                setSecondaryTasks(secondaryTasks => {
                    return (secondaryTasks) ? [...secondaryTasks, objectSecondaryTasks] : [objectSecondaryTasks];
                })
                setTasks("");
            }
        }
    }

    const handleClickDeletePrimaryTask = (id) => {
        setPrimaryTasks(taskP => {
            if (taskP.length) {
                return taskP.filter(task => task.id !== id);
            }
        });
    }

    const handleClickDeleteSecondaryTask = (id) => {
        setSecondaryTasks(taskS => {
            if (taskS.length) {
                return taskS.filter(task => task.id !== id);
            }
        })
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
                                <textarea id="textarea-tasks" rows="4" value={tasks} onChange={e => setTasks(e.target.value)} className="form-control mb-2" placeholder="Escribe algo..."></textarea>
                                <hr />
                                <div className="row div-md-task-buttons">
                                    <div className="col-sm-12 col-md-6 col-lg-6 div-md-button d-flex justify-content-center">
                                        <button className="btn btn-add" onClick={handleClickAddTasks}>Agregar</button>
                                    </div>
                                    <div className="col-sm-12 col-md-6 col-lg-6 form-check-priority form-check form-switch d-flex align-items-center justify-content-center">
                                        <div className="row">
                                            <div className="col-3">
                                                <input title="Marcar actividad como prioridad" checked={priorityTask} className="form-check-input" onChange={e => setPriorityTask(e.target.checked)} type="checkbox" role="switch" />
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
                                {
                                    primaryTasks.map(({ id, taskP }) => (
                                        <SingleTask key={id} id={id} task={taskP} titleCard={"P"} deleteTaskP={() => handleClickDeletePrimaryTask(id)} />
                                    ))
                                }
                            </TaskChart>
                        </div>
                        <div className="ul-secondary col-md-12 col-lg-6">
                            <TaskChart title={"Sin prioridad pero necesarias"}> {/* Se implementan las tareas sin prioridad */}
                                {
                                    secondaryTasks.map(({ id, taskS }) => (
                                        <SingleTask key={id} id={id} task={taskS} titleCard={"S"} deleteTaskS={() => handleClickDeleteSecondaryTask(id)} />
                                    ))
                                }
                            </TaskChart>
                        </div>
                    </article>
                </section>
            </main>
        </>
    )
}