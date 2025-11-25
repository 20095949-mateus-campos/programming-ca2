export default function Read() {
    return (
        <>
            <form id="form-delete" method="POST" action="{{ url_for('auth.delete', user_id=user.id) }}"></form>
            <div class="field">
                <div class="control">
                    <input form="form-update" class="input is-large" type="email" name="email" value="{{ user.email }}"
                           disabled aria-label="email input" placeholder="Email">
                </div>
            </div>
            <div class="field">
                <div class="control">
                    <input form="form-update" class="input is-large" type="text" name="name" value="{{ user.name }}"
                           disabled aria-label="name input" placeholder="Name">
                </div>
            </div>
            <div class="field">
                <div class="control">
                    <input form="form-update" class="input is-large" type="password" name="password" value="********"
                           disabled aria-label="password input" placeholder="Password">
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
                       onclick="return confirm('Are you sure you want to delete your account?')" value="Delete">
            </div>
        </>
    )
}
