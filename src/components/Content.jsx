import TaskChart from "./TasksTools";
import { SingleTask } from "./TasksTools";
import ErrorModal from "./ErrorModal";
import { useState } from "react";
import "../styles/Content.css";

export default function Content() {
    const [tasks, setTasks] = useState(""); //Estado para almacenar tareas ingresadas
    const [primaryTasks, setPrimaryTasks] = useState([]); //Estado para almacenar tareas primarias
    const [secondaryTasks, setSecondaryTasks] = useState([]); //Estado para almacenar tareas secundarias
    const [priorityTask, setPriorityTask] = useState(false); //Estado booleano que indica si una tarea es primaria o secundaria
    const [show, setShow] = useState(false); //Estado utilizable para el componente ErrorModal: indica si el modal se muestra en base a condición

    //Estados que inicialmente son null pero se llenan con el id de la tarea que se está editando
    //Esto es para poder editar tareas y no tener que volver a escribirlas
    const [editingPrimaryTaskId, setEditingPrimaryTaskId] = useState(null); //Estado para almacenar el id de la tarea primaria que se está editando
    const [editingSecondaryTaskId, setEditingSecondaryTaskId] = useState(null); //Estado para almacenar el id de la tarea secundaria que se está editando

    //Funcion que ejecuta la logica para agregar tareas, ya sean primarias o secundarias.
    function handleClickAddTasks() {
        //Objecto para almacenar tareas primarias
        const objectPrimaryTasks = {
            id: primaryTasks.length + 1,
            taskP: tasks
        }
        //Objecto para almacenar tareas primarias
        const objectSecondaryTasks = {
            id: secondaryTasks.length + 1,
            taskS: tasks
        }
        if (tasks === "") { //En esta parte, se muestra el modal de error si no se ha escrito nada en el textarea
            setShow(true);
        }
        else {
            if (priorityTask) { //Se almacenan tareas primarias o secundarias dependiendo del estado booleano
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
    //Función que contiene la lógica para eliminar tareas primarias
    function handleClickDeletePrimaryTask(id) {
        const s = setPrimaryTasks(taskP => {
            if (taskP.length) {
                return taskP.filter(task => task.id !== id);
            }
        });
    }
    //Función que contiene la lógica para eliminar tareas secundarias
    function handleClickDeleteSecondaryTask(id) {
        setSecondaryTasks(taskS => {
            if (taskS.length) {
                return taskS.filter(task => task.id !== id);
            }
        })
    }
    //Función que contiene la lógica para editar tareas primarias que ya fueron registradas
    function handleUpdatePrimaryTasks(id, newTask) {
        setPrimaryTasks(taskP => {
            return taskP.map(task => {
                if (task.id === id) {
                    return { ...task, taskP: newTask };
                }
                return task;
            })
        })
        setEditingPrimaryTaskId(null); //Estado null para que no se mantenga el id de la tarea primaria editada
    };
    //Función que contiene la lógica para editar tareas secundarias que ya fueron registradas
    function handleUpdateSecondaryTasks(id, newTask) {
        setSecondaryTasks(taskS => {
            return taskS.map(task => {
                if (task.id === id) {
                    return { ...task, taskS: newTask };
                }
                return task;
            })
        })
        setEditingSecondaryTaskId(null); //Estado null para que no se mantenga el id de la tarea secundaria editada
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
                                <textarea id="textarea-tasks" rows="3" value={tasks} onChange={e => setTasks(e.target.value)} className="form-control mb-2" placeholder="Escribe algo..."></textarea>
                                <hr />
                                <div className="row div-md-task-buttons">
                                    <div className="col-sm-12 col-md-6 col-lg-6 div-md-button d-flex justify-content-center">
                                        <button className="btn btn-add mb-1" onClick={handleClickAddTasks}>Agregar</button>
                                    </div>
                                    <div className="col-sm-12 col-md-6 col-lg-6 form-check-priority form-check form-switch d-flex align-items-center justify-content-center">
                                        <div className="row">
                                            <div className="col-sm-12 col-md-3 col-lg-3 d-flex align-items-center justify-content-center">
                                                <input title="Marcar actividad como prioridad" checked={priorityTask} className="form-check-input" onChange={e => setPriorityTask(e.target.checked)} type="checkbox" role="switch" />
                                            </div>
                                            <div className="col-sm-12 col-md-9 col-lg-9 d-flex align-items-center justify-content-center">
                                                <span className="form-check-label">TAREA CON PRIORIDAD</span>
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
                                    !primaryTasks.length
                                        ?
                                        <p className="p-empty-chart text-center">¡Empieza con tu primera tarea primaria!</p>
                                        :
                                        primaryTasks.map(({ id, taskP }) => (
                                            <SingleTask
                                                key={id}
                                                task={taskP}
                                                taskId={id}
                                                titleCard={"P"}
                                                isEditingP={editingPrimaryTaskId === id} //Condicion que favorece la edicion de tareas primarias
                                                setEditingIdP={setEditingPrimaryTaskId}
                                                updateTaskP={handleUpdatePrimaryTasks}
                                                deleteTaskP={() => handleClickDeletePrimaryTask(id)} />
                                        ))
                                }
                            </TaskChart>
                        </div>
                        <div className="ul-secondary col-md-12 col-lg-6">
                            <TaskChart title={"Sin prioridad pero necesarias"}> {/* Se implementan las tareas sin prioridad (secundarias) */}
                                {
                                    !secondaryTasks.length
                                        ?
                                        <p className="p-empty-chart text-center">¡Empieza con tu primera tarea secundaria!</p>
                                        :
                                        secondaryTasks.map(({ id, taskS }) => (
                                            <SingleTask
                                                key={id}
                                                task={taskS}
                                                taskId={id}
                                                titleCard={"S"}
                                                isEditingS={editingSecondaryTaskId === id} //Condicion que favorece la edicion de tareas secundarias
                                                setEditingIdS={setEditingSecondaryTaskId}
                                                updateTaskS={handleUpdateSecondaryTasks}
                                                deleteTaskS={() => handleClickDeleteSecondaryTask(id)} />
                                        ))
                                }
                            </TaskChart>
                            <ErrorModal
                                modalTitle={"Estimado usuario:"}
                                modalBody={"Por favor, escriba una tarea"}
                                show={show}
                                handleClose={() => setShow(false)} />
                        </div>
                    </article>
                </section>
            </main>
        </>
    )
}