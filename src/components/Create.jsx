// Module Title:         Programming for Information Systems
// Module Code:          B9IS123
// Module Instructor:    Paul Laird
// Assessment Title:     Reactive Web-Based Information System
// Assessment Number:    2
// Assessment Type:      Practical
// Assessment Weighting: 70%
// Assessment Due Date:  Sunday, 14 December 2025, 2:28 PM
// Student Name:         Mateus Fonseca Campos
// Student ID:           20095949
// Student Email:        20095949@mydbs.ie
// GitHub Repo:          https://github.com/20095949-mateus-campos/programming-ca2

// Bulma Docs referenced: https://bulma.io/documentation/components/panel/.

import Dropdown from "./Dropdown"

// Create component renders form for model creation
export default function Create({entity, create, read, props}) {
    let items = []

    // set a different type of element for each type of form field
    props.forEach((item, count) => {
        let type

        switch (item) {
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

        // default element is input
        let tag = <input className="input" type={type} name={item} placeholder={item} />

        // make element a Dropdown if needed
        if (item == "client" || item == "tool" || item == "product" || item == "material" || item == "process") {
            tag = <Dropdown table={item} />
        }

        // male element a textarea if needed
        if (item == "description") {
            tag = <textarea name={item}></textarea>
        }

        // add element to form
        items.push(
            <div key={count} className="panel-block">
                <label className="label" htmlFor={item}>{item}:</label>
                {tag}
            </div>
        )

    })

    // return form
    return (
        <>
            <form action={(formData) => {
                let json = {}

                // build JSON object from formData
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
                
                // create model with JSON object
                create(entity, json)}}>
                
                {/* render panel with form fields and buttons */}
                <nav className="panel">
                    <p className="panel-heading">{entity}</p>
                    {items}
                    <div className="panel-block">
                        <button id="button-update" className="button is-link is-outlined is-fullwidth" type="submit">Save</button>
                    </div>
                    <div className="panel-block">
                        <button type="button" id="button-delete" className="button is-link is-outlined is-fullwidth"
                        onClick={() => read(entity)}>Cancel</button>
                    </div>
                </nav>
            </form>
        </>
    )
}
