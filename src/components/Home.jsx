// Module Title:         Programming for Information Systems
// Module Code:          B9IS123
// Module Instructor:    Paul Laird
// Assessment Title:     Reactive Web-Based Information System
// Assessment Number:    2
// Assessment Type:      Practical
// Assessment Weighting: 70%
// Assessment Due Date:  Sunday, 14 December 2025, 2:28 PM
// Student Name:         Mateus Fonseca Campos
// Student ID:           20095949
// Student Email:        20095949@mydbs.ie
// GitHub Repo:          https://github.com/20095949-mateus-campos/programming-ca2

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
