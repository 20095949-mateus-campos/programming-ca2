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
                    json[item] = formData.get(item)
                })

                console.log(json)
                
                create(entity, json)}}>
                {items}
                <div class="field control">
                    <button id="button-update" class="button is-block is-info is-large is-fullwidth" type="submit">
                        Save
                    </button>
                </div>
                <div class="field control">
                    <button id="button-delete" class="button is-block is-danger is-large is-fullwidth"
                        onClick={() => read(entity)}>
                        Cancel
                    </button>
                </div>
            </form>
        </>
    )
}
