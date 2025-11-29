export default function Navbar({home, read}) {

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



    return (
        <>
            <div className="hero-head">
                <nav className="navbar">






    
<div class="navbar-brand">
    <a class="navbar-item" onClick={home}>Home</a>
    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarMenuHeroA" onClick={toggle}>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>







                    <div className="container">
                        <div id="navbarMenuHeroA" className="navbar-menu">
                            <div className="navbar-end">
                                <a className="navbar-item" onClick={() => read("product")}>Products</a>
                                <a className="navbar-item" onClick={() => read("workorder")}>Work Orders</a>
                                <a className="navbar-item" onClick={() => read("client")}>Clients</a>
                                <a className="navbar-item" onClick={() => read("process")}>Processes</a>
                                <a className="navbar-item" onClick={() => read("material")}>Materials</a>
                                <a className="navbar-item" onClick={() => read("tool")}>Tools</a>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}
