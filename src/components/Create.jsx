import { useEffect, useEffectEvent, useState } from "react"
import Dropdown from "./Dropdown"

export default function Create({entity, create, read, props}) {
    let items = []
    const [clientState, setClientState] = useState([])
    const [productState, setProductState] = useState([])
    // let dep = null
    const [dep, setDep] = useState("")

    // async function fetchData(table) {
    //     await fetch(`/api/read/${table}/0`, {method: "GET"})
    //         .then(res => res.json())
    //         .then(data => {
    //             switch (table) {
    //                 case 'client':
    //                     setClientState(data)
    //                     break
    //                 case 'product':
    //                     setProductState(data)
    //                     break
    //             }
    //         })
    // }

    // let manager = {
    //     client: clientState,
    //     product: productState
    // }

    // useEffect(() => {
    //     fetchData(dep)
    // }, [])

    // console.log(clientState)
    // console.log(productState)


    props.forEach(item => {
        // console.log(item.name + ' ' + item.id)


        let type
        switch (item) {
            case "blueprint":
                type = "text"
                break
            case "email":
                type = "email"
                break
            case "phone":
                type = "tel"
                break
            case "cost":
                type = "number"
                break
            case "start":
            case "end":
                type = "date"
                break
            default:
                type = "text"
                break
        }

        let tag = <input className="input" type={type} name={item}
                            placeholder={item} />

        if (item == "client" || item == "tool" || item == "product" || item == "material" || item == "process") {
            // setDep(item)

            // tag = <select name={item}>
            //     {manager[item] ? manager[item].map(process => {
            //         return <option value={JSON.parse(process).id}>{JSON.parse(process).name}</option>
            //     }) : "Loading..."}
            //     </select>

            tag = <Dropdown table={item}/>
        }

        if (item == "description") {
            tag = <textarea name={item}></textarea>
        }

        // if (item == 'tool') {

        //         dep = "tool"

        //         response.forEach(process => {
        //             processes.push(<option value={JSON.parse(process).id}>{JSON.parse(process).name}</option>)
        //         })

        //         tag = <select name={item}>
        //         {response ?
        //         processes : "Loading..."}
        //     </select>

        // }

        

        items.push(<div className="panel-block">
                        <label className="label" for={item}>{item}:</label>
                        {tag}
                    </div>
                )

    })

    
    // const [dep, setDep] = useState(null)

    
    
    

    

    // switch (entity) {
    //         case "product":
    //             // setDep("tool")
    //             dep = "process"

    //             response.forEach(process => {
    //                 processes.push(<option>{JSON.parse(process).name}</option>)
    //             })

    //             items.push(<div className="panel-block">
    //                     <label className="label">Process:</label>
    //                     <select>
    //             {response ?
    //             processes : "Loading..."}
    //         </select>
    //                 </div>)
    //             break
    //         case "process":
    //             // setDep("tool")
    //             dep = "tool"

    //             response.forEach(process => {
    //                 processes.push(<option name="tool">{JSON.parse(process).name}</option>)
    //             })

    //             items.push(<div className="panel-block">
    //                     <label className="label">Tool:</label>
    //                     <select>
    //             {response ?
    //             processes : "Loading..."}
    //         </select>
    //                 </div>)
    //             break
    //     }

    return (
        <>
            <form action={(formData) => {

                // let formData = new FormData(e.target)

                // console.log(formData.get('name'))

                // for (const key of formData.keys()) {
                //     console.log('key');
                //     console.log(key);
                //     }

                let json = {}

                props.forEach(item => {
                    if (item == 'tool')
                        json[item] = {Use: formData.get(item)}
                    else if (item == 'process')
                        json[item] = {BOP: formData.get(item)}
                    else if (item == 'material')
                        json[item] = {BOM: formData.get(item)}
                    else
                        json[item] = formData.get(item)
                })

                console.log(json)
                
                create(entity, json)}}>
                
                <nav className="panel">
                    <p className="panel-heading">{entity}</p>
                    {items}
                    <div className="panel-block">
                    <button id="button-update" className="button is-link is-outlined is-fullwidth" type="submit">
                        Save
                    </button></div>
                    <div className="panel-block">
                    <button type="button" id="button-delete" className="button is-link is-outlined is-fullwidth"
                        onClick={() => read(entity)}>
                        Cancel
                    </button></div>
                </nav>
            </form>
        </>
    )
}
