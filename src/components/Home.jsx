// Bulma Docs referenced: https://bulma.io/documentation/components/panel/.

// Home component displays landing view menu
export default function Home({read}) {
    return (
        <>
            <nav className="panel">
                <p className="panel-heading">ERP</p>
                <div className="panel-block">
                    <button key={0} className="button is-link is-outlined is-fullwidth" onClick={() => read("product")}>Products</button>
                </div>
                <div className="panel-block">
                    <button key={1} className="button is-link is-outlined is-fullwidth" onClick={() => read("workorder")}>Work Orders</button>
                </div>
                <div className="panel-block">
                    <button key={2} className="button is-link is-outlined is-fullwidth" onClick={() => read("client")}>Clients</button>
                </div>
                <div className="panel-block">
                    <button key={3} className="button is-link is-outlined is-fullwidth" onClick={() => read("process")}>Processes</button>
                </div>
                <div className="panel-block">
                    <button key={4} className="button is-link is-outlined is-fullwidth" onClick={() => read("material")}>Materials</button>
                </div>
                <div className="panel-block">
                    <button key={5} className="button is-link is-outlined is-fullwidth" onClick={() => read("tool")}>Tools</button>
                </div>
            </nav>
        </>
    )
}
