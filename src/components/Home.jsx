export default function Home({read}) {
    return (
        <>
            <nav className="panel">
                <p className="panel-heading">ERP</p>
                    <div className="panel-block">
                    <button className="button is-link is-outlined is-fullwidth" onClick={() => read("product")}>Products</button>
                    </div>
            <div className="panel-block">
            <button className="button is-link is-outlined is-fullwidth" onClick={() => read("workorder")}>Work Orders</button>
            </div>
            <div className="panel-block">
            <button className="button is-link is-outlined is-fullwidth" onClick={() => read("client")}>Clients</button>
            </div>
            <div className="panel-block">
            <button className="button is-link is-outlined is-fullwidth" onClick={() => read("process")}>Processes</button>
            </div>
            <div className="panel-block">
            <button className="button is-link is-outlined is-fullwidth" onClick={() => read("material")}>Materials</button>
            </div>
            <div className="panel-block">
            <button className="button is-link is-outlined is-fullwidth" onClick={() => read("tool")}>Tools</button>
            </div>
            </nav>
        </>
    )
}
