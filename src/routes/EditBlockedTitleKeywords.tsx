import { JSX, Show, createSignal } from 'solid-js'

import Storage from '../constants/storage'
import getDefaultValue from '../utilities/getDefaultValue'

function EditBlockedTitleKeywords(): JSX.Element {
  const [isSaved, setIsSaved] = createSignal(false)
  const blockedTitleKeywords = getDefaultValue(Storage.BLOCKED_TITLE_KEYWORDS)

  const handleSubmit = async (
    event: Event & { currentTarget: HTMLFormElement },
  ): Promise<void> => {
    event.preventDefault()

    setIsSaved(false)

    const entries = [...new FormData(event.currentTarget).entries()]

    entries.forEach(([key, value]) => {
      localStorage.setItem(key, value.toString())
    })

    await new Promise((resolve) => {
      setTimeout(() => resolve(undefined), 500)
    })

    setIsSaved(true)
  }

  return (
    <main class="main">
      <h1 class="title">Blocked title keywords</h1>
      <div class="block">
        <form action="" method="get" onSubmit={handleSubmit}>
          <fieldset>
            <label for={Storage.BLOCKED_TITLE_KEYWORDS}>
              blocked title keywords
            </label>
            <p>
              comma separated words; if a post title includes this word(s) it
              will not be shown
            </p>
            <textarea
              value={blockedTitleKeywords}
              id={Storage.BLOCKED_TITLE_KEYWORDS}
              name={Storage.BLOCKED_TITLE_KEYWORDS}
              onChange={() => setIsSaved(false)}
            />
          </fieldset>

          <button class="btn" type="submit">
            Save
          </button>
          <Show when={isSaved()}>
            <p>Changes were saved.</p>
          </Show>
        </form>
      </div>
    </main>
  )
}

export default EditBlockedTitleKeywords
