import "../styles/Content.css";
import TaskChart from "./TasksTools";

export default function Content() {
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
                        <div className="col-12 d-flex justify-content-center">
                            <textarea id="textarea-tasks" className="form-control m-3" placeholder="Escribe algo..."></textarea>
                        </div>
                    </article>
                    <article className="row">
                        <div className="col-md-12 col-lg-6">
                            <TaskChart title={"Mis mayores prioridades"}>
                                {/* Implementacion de tareas luego*/}
                            </TaskChart>
                        </div>
                        <div className="col-md-12 col-lg-6">
                            <TaskChart title={"Sin prioridad pero necesarias"}>
                                {/* Implementacion de tareas luego*/}
                            </TaskChart>
                        </div>
                    </article>
                </section>
            </main>
        </>
    )
}