export default function Home({read}) {
    return (
        <>
            <nav class="panel">
                <p class="panel-heading">ERP</p>
                    <div class="panel-block">
                    <button class="button is-link is-outlined is-fullwidth" onClick={() => read("product")}>Products</button>
                    </div>
            <div class="panel-block">
            <button class="button is-link is-outlined is-fullwidth" onClick={() => read("workorder")}>Work Orders</button>
            </div>
            <div class="panel-block">
            <button class="button is-link is-outlined is-fullwidth" onClick={() => read("client")}>Clients</button>
            </div>
            <div class="panel-block">
            <button class="button is-link is-outlined is-fullwidth" onClick={() => read("process")}>Processes</button>
            </div>
            <div class="panel-block">
            <button class="button is-link is-outlined is-fullwidth" onClick={() => read("material")}>Materials</button>
            </div>
            <div class="panel-block">
            <button class="button is-link is-outlined is-fullwidth" onClick={() => read("tool")}>Tools</button>
            </div>
            </nav>
        </>
    )
}
