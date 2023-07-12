import { JSX, Show, createSignal } from 'solid-js'

import Storage from '../constants/storage'
import getDefaultValue from '../utilities/getDefaultValue'
import Tags from '../components/Tags/Tags'
import Search from '../components/Search/Search'

function EditBlockedSubreddits(): JSX.Element {
  const formId = 'editBlockedSubreddits'
  const [isSaved, setIsSaved] = createSignal(false)
  const [myBlockedSubreddits, setMyBlockedSubreddits] = createSignal(
    getDefaultValue(Storage.BLOCKED_SUBREDDITS),
  )

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
      <h1 class="title">Blocked subreddits</h1>
      <div class="block">
        <form action="" id={formId} method="get" onSubmit={handleSubmit}>
          <fieldset>
            <label for={Storage.BLOCKED_SUBREDDITS}>blocked subreddits</label>
            <p>
              comma separated subreddit names which should not be shown in the
              best/top/hot list(s)
            </p>
            <textarea
              id={Storage.BLOCKED_SUBREDDITS}
              name={Storage.BLOCKED_SUBREDDITS}
              onChange={(event) => {
                setMyBlockedSubreddits(event.currentTarget.value)
                setIsSaved(false)
              }}
              value={myBlockedSubreddits()}
            />
            <Tags
              onClick={(sub) =>
                setMyBlockedSubreddits((prev) =>
                  prev
                    .split(',')
                    .filter(Boolean)
                    .filter((tag) => tag !== sub)
                    .join(','),
                )
              }
              value={myBlockedSubreddits()}
            />
          </fieldset>
        </form>

        <Search
          id={Storage.BLOCKED_SUBREDDITS}
          onSubmit={(query) => {
            setMyBlockedSubreddits((prev) =>
              [...prev.split(',').filter(Boolean), query].join(','),
            )
          }}
        />

        <button class="btn" form={formId} type="submit">
          Save
        </button>
        <Show when={isSaved()}>
          <p>Changes were saved.</p>
        </Show>
      </div>
    </main>
  )
}

export default EditBlockedSubreddits
