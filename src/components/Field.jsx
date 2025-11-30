import { use, useEffect, useState } from "react"

export default function Field({type, table, id, read}) {
    const [response, setResponse] = useState([])

    useEffect(() => {
        fetchData(table, id)
    }, [])

    async function fetchData(table, id) {
        if (["client", "tool", "product", "material", "process"].includes(table)) {
        await fetch(`/api/read/${table}/${id}`, {method: "GET"})
            .then(res => res.json())
            .then(data => {setResponse(data); console.log(data)})
        }
    }

    let element

    if (type == 'id')
        element = <a onClick={() => read(table, response.id)}>
                    <p>{response.name}</p>
                </a>
    else if (type == 'input')
        element = <input disabled className="input is-large" name={table} placeholder={table} defaultValue={id}/>
    else if (type == 'img')
        element = <a onClick={() => open(id)}>
            <img src={id}></img>
            </a>

    return (
        <>
            {response ?
                element
             : "Loading..."}
        </>
    )
}