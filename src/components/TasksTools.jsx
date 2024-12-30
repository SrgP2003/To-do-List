export default function TaskChart({ title, children }) {
    return (
        <div className="card">
            <div className="card-header text-center">
                <h3>{title}</h3>
            </div>
            <div className="card-body">
                {children}
            </div>
        </div>
    )
}