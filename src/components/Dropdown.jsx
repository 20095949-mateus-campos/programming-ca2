import { use, useEffect, useState } from "react"

export default function Dropdown({table}) {
    const [response, setResponse] = useState([])

    useEffect(() => {
        fetchData(table)
    }, [])

    async function fetchData(table) {
        await fetch(`/api/read/${table}/0`, {method: "GET"})
            .then(res => res.json())
            .then(data => setResponse(data))
    }

    return (
        <>
            <select name={table}>
                {response ? response.map(process => {
                    return <option value={JSON.parse(process).id}>{JSON.parse(process).name}</option>
                }) : "Loading..."}
            </select>
        </>
    )
}