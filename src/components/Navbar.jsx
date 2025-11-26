export default function Navbar({home, read}) {
    return (
        <>
            <div className="hero-head">
                <nav className="navbar">
                    <div className="container">
                        <div id="navbarMenuHeroA" className="navbar-menu">
                            <div className="navbar-end">
                                <a className="navbar-item" onClick={home}>Home</a>
                                <a className="navbar-item" onClick={() => read("product")}>Products</a>
                                <a className="navbar-item" onClick={() => read("work-order")}>Work Orders</a>
                                <a className="navbar-item" onClick={() => read("client")}>Clients</a>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}
