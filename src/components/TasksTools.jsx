export default function TaskChart({ title, children }) {
    return (
        <div className="card card-task-chart">
            <div className="card-header text-center">
                <h3>{title}</h3>
            </div>
            <div className="card-body">
                {children}
            </div>
        </div>
    )
}

export function SingleTask({id, task, titleCard, deleteTaskP, deleteTaskS}) {
    return (
        <div className="card card-single-task mb-2">
            <div className="card-body">
                <div className="row gx-1">
                    <div className="form-check container">
                        <input id="task" type="checkbox" className="form-check-input" />
                        <p htmlFor="task" className="form-check-label">{id}. {task}</p>
                    </div>
                </div>
                <hr />
                <div className="row row-options gx-1 text-center">
                    <div className="col-12 col-text-options text-center">
                        <p>Presiona o sitúa el cursor aquí para ver opciones de la tarea</p>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6 pb-1">
                        <button className="btn btn-task-modify w-100">Modificar</button>
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