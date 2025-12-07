// React Docs referenced: https://react.dev/reference/react/useState.
// Bulma Docs referenced: https://bulma.io/documentation/components/panel/.

import { useState } from "react"
import Field from "./Field"

// Read component renders form for model inspection, update and deletion
export default function Read({entity, json, read, create, update, delete_row, home}) {
    const [ready, setReady] = useState(false)
    
    // if reading multiple models from a list
    if (Array.isArray(json)) {
        let items = []

        // render a link element for each model in list
        json.forEach(item => {
            if (entity == 'workorder')
                items.push(<a key={item.id} className="panel-block" onClick={() => read(entity, item.id)}>Work Order #{item.id}</a>)
            else
                items.push(<a key={item.id} className="panel-block" onClick={() => read(entity, item.id)}>{item.name}</a>)
        })

        // capitalize and pluralize list heading
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

        // renders list of models
        return (
            <>
                <nav className="panel">
                    <p className="panel-heading">{heading}</p>
                    <div className="panel-block">
                        <input className="input" type="text" placeholder="Search" />
                    </div>
                    {items}
                    <div className="panel-block">
                        <button className="button is-link is-outlined is-fullwidth" onClick={() => create(entity)}>Add</button>
                    </div>
                    <div className="panel-block">
                        <button className="button is-link is-outlined is-fullwidth" onClick={() => home()}>Back</button>
                    </div>
                </nav>
            </>
        )

    // if reading only one model
    } else {
        let items = []

        // render one field for each model attribute
        Object.keys(json).forEach((item, count) => {
            // default field is type input
            let tag = <Field type={'input'} table={item} id={json[item]} read={read}/>

            // make field of ID type if needed
            if (item == "client" || item == "tool" || item == "product" || item == "material" || item == "process") {
                tag = <Field type={'id'} table={item} id={json[item]} read={read}/>
            }

            // make field of image type if needed
            if (item == 'blueprint') {
                tag = <Field type={'img'} table={item} id={json[item]} read={read}/>
            }

            // add all fields to form, except ID
            if (item != 'id') {
                items.push(
                    <div key={count} className="field">
                        <div className="control">
                            <label className="label" htmlFor={item}>{item}:</label>
                            {tag}
                        </div>
                    </div>
                )
            }
        })

        // toggle form fields disabled on and off
        function toggleForm() {
            Array.from(document.getElementsByTagName('input')).map(el => el.disabled = false)
            setReady(true)  // update component state
        }

        // return form
        return (
            <>
                <form action={(formData) => {

                    let data = {}

                    // build JSON object from formData
                    Object.keys(json).forEach(item => {
                        if (item != 'id')
                            data[item] = formData.get(item)
                    })
                
                    update(entity, data, json.id)}}>

                    {/* render all fields */}
                    {items}

                    {/* button text = Update -> *press*(Update) -> Save */}
                    <div className="field control">
                        { ready ?
                            <button key="second" id="button-submit" className="button is-block is-info is-large is-fullwidth" type="submit">Save</button>
                        :
                            <button key="first" id="button-update" className="button is-block is-info is-large is-fullwidth" onClick={toggleForm}>Update</button>
                        }
                    </div>

                    {/* button text = Back -> *press*(Update) -> Cancel */}
                    <div className="field control">
                        { ready ?
                            <button id="button-cancel" className="button is-block is-info is-large is-fullwidth" type="button" onClick={() => read(entity)}>Cancel</button>
                        :
                            <button id="button-back" className="button is-block is-info is-large is-fullwidth" type="button" onClick={() => read(entity)}>Back</button>
                        }
                    </div>

                    {/* button Delete requires user confirmation */}
                    <div className="field control">
                        <button id="button-delete" className="button is-block is-danger is-large is-fullwidth" type="button" onClick={() => {
                            if (window.confirm("Are you sure?"))
                                delete_row(entity, json.id)
                            }}>Delete</button>
                    </div>
                </form>
            </>
        )
    }
}
