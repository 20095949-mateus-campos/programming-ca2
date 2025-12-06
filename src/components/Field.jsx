// React Docs referenced: https://react.dev/reference/react/useState and https://react.dev/reference/react/useEffect.
// MDN Docs referenced: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch.
// Bulma Docs referenced: https://bulma.io/documentation/form/input/.

import { useEffect, useState } from "react"

// Field component whose contents are asynchronously loaded and reactively updated
export default function Field({type, table, id, read}) {
    const [response, setResponse] = useState([])

    // useEffect updates dropdown list after page has loaded
    useEffect(() => {
        fetchData(table, id)
    }, [])

    // get model details
    async function fetchData(table, id) {
        if (["client", "tool", "product", "material", "process"].includes(table)) {
        await fetch(`/api/read/${table}/${id}`, {method: "GET"})
            .then(res => res.json())
            .then(data => setResponse(data))  // update component's state; triggers useEffect
        }
    }

    let element
    
    // return different elements depending on field type
    if (type == 'id')
        element = <a key={response.id} onClick={() => read(table, response.id)}>
                    <p>{response.name}</p>
                </a>
    else if (type == 'input')
        element = <input key={response.id} disabled className="input is-large" name={table} placeholder={table} defaultValue={id}/>
    else if (type == 'img')
        element = <a key={response.id} onClick={() => open(id)}>
            <img src={id}></img>
            </a>

    // return element
    // display "Loading..." while promise has not been fufilled
    return (
        <>
            {response ?
                element
             : "Loading..."}
        </>
    )
}