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
                <nav class="panel">
                    <p class="panel-heading">{entity}</p>
                    <div class="panel-block">
                        <p class="control has-icons-left">
                        <input class="input" type="text" placeholder="Search" />
                        <span class="icon is-left">
                            <i class="fas fa-search" aria-hidden="true"></i>
                        </span>
                        </p>
                    </div>
                    <p class="panel-tabs">
                        <a class="is-active">All</a>
                        <a>Jigs</a>
                        <a>Fixtures</a>
                        <a>Platforms</a>
                    </p>
                    {items}
                    <div class="panel-block">
                        <button class="button is-link is-outlined is-fullwidth" onClick={() => create(entity, "read")}>
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
            items.push(<div class="field">
                        <div class="control">
                            <input disabled class="input is-large" name={item}
                                placeholder={item} defaultValue={json[item]}/>
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
                {/* <form id="form-delete" method="POST" action="{{ url_for('auth.delete', user_id=user.id) }}"></form> */}
                <div class="field">
                    <div class="control">
                        <input form="form-update" class="input is-large" type="email" name="email" value={json.name}
                            disabled aria-label="email input" placeholder="Email" />
                    </div>
                </div>
                <div class="field">
                    <div class="control">
                        <input form="form-update" class="input is-large" type="text" name="name" value="{{ user.name }}"
                            disabled aria-label="name input" placeholder="Name" />
                    </div>
                </div>
                <div class="field">
                    <div class="control">
                        <input form="form-update" class="input is-large" type="password" name="password" value="********"
                            disabled aria-label="password input" placeholder="Password" />
                    </div>
                </div>
                <div class="field control">
                    <button id="button-update" class="button is-block is-info is-large is-fullwidth" type="button"
                            onclick="toggleForm('{{ user.email }}', '{{ user.name }}', '********')">
                        Update
                    </button>
                </div>
                <div class="field control">
                    <input form="form-delete" id="button-delete" class="button is-block is-danger is-large is-fullwidth"
                        type="submit"
                        onclick="return confirm('Are you sure you want to delete your account?')" value="Delete" />
                </div>
            </>
        )
    }
}
