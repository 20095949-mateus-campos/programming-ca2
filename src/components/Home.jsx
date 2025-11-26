export default function Home({read}) {
    return (
        <>
            <button class="button is-block is-info is-large is-fullwidth" onClick={() => read("product")}>Products</button>
            <br />
            <button class="button is-block is-info is-large is-fullwidth" onClick={() => read("work-order")}>Work Orders</button>
            <br />
            <button class="button is-block is-info is-large is-fullwidth" onClick={() => read("client")}>Clients</button>
        </>
    )
}
