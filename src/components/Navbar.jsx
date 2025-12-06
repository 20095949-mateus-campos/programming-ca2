// Bulma Docs referenced: https://bulma.io/documentation/components/navbar/.

// Navbar component displays collapsible navigation bar
export default function Navbar({home, read}) {
    
    // toggle navbar hamburger on and off
    function toggle() {
        Array.from(document.getElementsByClassName("navbar-burger")).forEach(el => {
            el.addEventListener('click', () => {
                let target = el.dataset.target
                target = document.getElementById(target)
                el.classList.toggle('is-active')
                target.classList.toggle('is-active')
            })
        })
    }

    // return navbar component
    return (
        <>
            <div className="hero-head">
                <nav className="navbar">
                    {/* collapsible hamburger */}
                    <div className="navbar-brand">
                        <a key={0} className="navbar-item" onClick={home}>Home</a>
                        <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarMenuHeroA" onClick={toggle}>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>

                    {/* regular navbar */}
                    <div className="container">
                        <div id="navbarMenuHeroA" className="navbar-menu">
                            <div className="navbar-end">
                                <a key={1} className="navbar-item" onClick={() => read("product")}>Products</a>
                                <a key={2} className="navbar-item" onClick={() => read("workorder")}>Work Orders</a>
                                <a key={3} className="navbar-item" onClick={() => read("client")}>Clients</a>
                                <a key={4} className="navbar-item" onClick={() => read("process")}>Processes</a>
                                <a key={5} className="navbar-item" onClick={() => read("material")}>Materials</a>
                                <a key={6} className="navbar-item" onClick={() => read("tool")}>Tools</a>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}
