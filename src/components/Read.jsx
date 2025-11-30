export default function Read({entity, json, read, create}) {
    // console.log(json)

    if (Array.isArray(json)) {
        let items = []

        json.forEach(item => {
            console.log(item.name + ' ' + item.id)
            items.push(<a class="panel-block" onClick={() => read(entity, item.id)}>{item.name}</a>)
        })

        // console.log(items)

        return (
            <>
                <nav className="panel">
                    <p className="panel-heading">{heading}</p>
                    <div className="panel-block">
                        <input className="input" type="text" placeholder="Search" />
                    </div>
                    <p class="panel-tabs">
                        <a class="is-active">All</a>
                        <a>Jigs</a>
                        <a>Fixtures</a>
                        <a>Platforms</a>
                    </p>
                    {items}
                    <div className="panel-block">
                        <button className="button is-link is-outlined is-fullwidth" onClick={() => create(entity)}>
                        Add
                        </button>
                    </div>
                </nav>
            </>
        )
    } else {
        let items = []

        Object.keys(json).forEach(item => {
            // console.log(item.name + ' ' + item.id)
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
