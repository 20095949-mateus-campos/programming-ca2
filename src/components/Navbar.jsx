export default function Navbar({funcs}) {
    return (
        <>
            <div class="hero-head">
                <nav class="navbar">
                    <div class="container">
                        <div id="navbarMenuHeroA" class="navbar-menu">
                            <div class="navbar-end">
                                <a class="navbar-item" type="button" onClick={funcs[0]}>Home</a>
                                <a class="navbar-item" onClick={funcs[1]}>Products</a>
                                <a class="navbar-item" onClick={funcs[1]}>Work Orders</a>
                                <a class="navbar-item" onClick={funcs[1]}>Clients</a>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}
