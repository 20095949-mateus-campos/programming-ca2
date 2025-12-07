// React Docs referenced: https://react.dev/reference/react/useState and https://react.dev/reference/react/useEffect.
// MDN Docs referenced: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch.

import { useEffect, useState } from "react"

// Dropdown component whose options are asynchronously loaded and reactively updated
export default function Dropdown({table}) {
    const [response, setResponse] = useState([])

    // useEffect updates dropdown list after page has loaded
    useEffect(() => {
        fetchData(table)
    }, [])

    // get all models from table
    async function fetchData(table) {
        await fetch(`/api/read/${table}/0`, {method: "GET"})
            .then(res => res.json())
            .then(data => setResponse(data))  // update component's state; triggers useEffect
    }

    // return component with list of options
    // display "Loading..." while promise has not been fufilled
    return (
        <>
            <select name={table}>
                {response ? response.map(field => {
                    return <option key={field.id} value={field.id}>{field.name}</option>
                }) : "Loading..."}
            </select>
        </>
    )
}