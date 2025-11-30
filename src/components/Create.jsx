export default function Create({entity, create, read, props}) {
    let items = []

    props.forEach(item => {
        // console.log(item.name + ' ' + item.id)
        items.push(<div class="field">
                    <div class="control">
                        <input class="input is-large" name={item}
                            aria-label="email input" placeholder={item} />
                    </div>
                </div>)
    })

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
