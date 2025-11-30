import { useState } from "react"
import Dropdown from "./Dropdown"
import Field from "./Field"

export default function Read({entity, json, read, create, update, delete_row, home}) {

    console.log(json)

    if (Array.isArray(json)) {
        let items = []

        json.forEach(item => {
            item = JSON.parse(item)
            console.log(item.name + ' ' + item.id)
            if (entity == 'workorder')
                items.push(<a className="panel-block" onClick={() => read(entity, item.id)}>Work Order #{item.id}</a>)
            else
                items.push(<a className="panel-block" onClick={() => read(entity, item.id)}>{item.name}</a>)
        })

        console.log(entity)

        let capitalize = entity[0].toUpperCase()

        let pluralize = ""
        if (entity[entity.length-1] == "s")
            pluralize = entity.slice(1) + "es"
        else
            pluralize = entity.slice(1) + "s"

        let heading = capitalize + pluralize


        if (entity == "workorder") {
            heading = heading.slice(0, 4) + " " + heading[4].toUpperCase() + heading.slice(5)
        }

        return (
            <>
                <nav className="panel">
                    <p className="panel-heading">{heading}</p>
                    <div className="panel-block">
                        <input className="input" type="text" placeholder="Search" />
                    </div>
                    {items}
                    <div className="panel-block">
                        <button className="button is-link is-outlined is-fullwidth" onClick={() => create(entity)}>
                        Add
                        </button>
                    </div>
                    <div className="panel-block">
                        <button className="button is-link is-outlined is-fullwidth" onClick={() => home()}>
                        Back
                        </button>
                    </div>
                </nav>
            </>
        )
    } else {
        let items = []

        Object.keys(json).forEach(item => {
            let tag = <Field type={'input'} table={item} id={json[item]} read={read}/>

            if (item == "client" || item == "tool" || item == "product" || item == "material" || item == "process") {
                        // setDep(item)
            
                        // tag = <select name={item}>
                        //     {manager[item] ? manager[item].map(process => {
                        //         return <option value={JSON.parse(process).id}>{JSON.parse(process).name}</option>
                        //     }) : "Loading..."}
                        //     </select>
            
                        tag = <Field type={'id'} table={item} id={json[item]} read={read}/>
            }

            if (item == 'blueprint') {
                tag = <Field type={'img'} table={item} id={json[item]} read={read}/>
            }

            if (item != 'id') {
            items.push(<div className="field">
                        <div className="control">
                            <label className="label" for={item}>{item}:</label>
                            {tag}
                        </div>
                    </div>)
            }
        })

        function toggleForm() {
            Array.from(document.getElementsByTagName('input')).map(el => el.disabled = false)
            setReady(true)
        }

        const [ready, setReady] = useState(false)

        return (
            <>
                <form action={(formData) => {

                // let formData = new FormData(e.target)

                // console.log(formData.get('name'))

                // for (const key of formData.keys()) {
                //     console.log('key');
                //     console.log(key);
                //     }

                let data = {}

                Object.keys(json).forEach(item => {
                    if (item != 'id')
                        data[item] = formData.get(item)
                })

                // console.log(data)
                
                update(entity, data, json.id)}}>
                {items}
                <div className="field control">
                    { ready ?
                    <button key="second" id="button-submit" className="button is-block is-info is-large is-fullwidth" type="submit">
                        Save
                    </button>:
                    <button key="first" id="button-update" className="button is-block is-info is-large is-fullwidth"
                            onClick={toggleForm}>
                        Update
                    </button>}
                </div>

                <div className="field control">
                    { ready ?
                    <button id="button-cancel" className="button is-block is-info is-large is-fullwidth" type="button"
                        onClick={() => read(entity)}>Cancel</button>
                    :
                    <button id="button-back" className="button is-block is-info is-large is-fullwidth" type="button"
                        onClick={() => read(entity)}>Back</button>
                    }
                </div>
                    <button id="button-delete" className="button is-block is-danger is-large is-fullwidth" type="button"
                        onClick={() => {

                            if (window.confirm("Are you sure?"))
                                delete_row(entity, json.id)

                        }}>Delete</button>
                <div className="field control">

                </div>
                </form>
            </>
        )
    }
}
