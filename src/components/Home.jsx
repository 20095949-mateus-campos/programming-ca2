export default function Home({funcs}) {
    return (
        <>
            <button class="button is-block is-info is-large is-fullwidth" onClick={funcs}>Products</button>
            <br />
            <button class="button is-block is-info is-large is-fullwidth" onClick={funcs}>Work Orders</button>
            <br />
            <button class="button is-block is-info is-large is-fullwidth" onClick={funcs}>Clients</button>
        </>
    )
}
