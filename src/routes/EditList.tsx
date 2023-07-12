import { JSX, createSignal, Show, createEffect, on, createMemo } from 'solid-js'

import getDefaultValue from '../utilities/getDefaultValue'
import Tags from '../components/Tags/Tags'
import Search from '../components/Search/Search'
import { useSearchParams } from '@solidjs/router'

function EditList(): JSX.Element {
  const [searchParams] = useSearchParams()
  const [id, setId] = createSignal(searchParams.list || 'listId')
  const formId = createMemo(() => `form-${id()}`)
  const [isSaved, setIsSaved] = createSignal(false)
  const [state, setState] = createSignal(getDefaultValue(id()))

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

  createEffect(
    on(
      () => searchParams.list,
      () => {
        setId(searchParams.list)
      },
    ),
  )

  return (
    <main class="main">
      <h1 class="title">Edit list</h1>
      <div class="block">
        <form id={formId()} onSubmit={handleSubmit}>
          <fieldset>
            <label for={id()}>List {id()}</label>
            <p>comma separated subreddit names</p>
            <textarea
              id={id()}
              name={id()}
              onChange={(event) => {
                setState(event.currentTarget.value)
                setIsSaved(false)
              }}
              required
              value={state()}
            />
            <Tags
              onClick={(sub) =>
                setState((prev) =>
                  prev
                    .split(',')
                    .filter(Boolean)
                    .filter((tag) => tag !== sub)
                    .join(','),
                )
              }
              value={state()}
            />
          </fieldset>
        </form>

        <Search
          id={id()}
          onSubmit={(query) => {
            setState((prev) =>
              [...prev.split(',').filter(Boolean), query].join(','),
            )
          }}
        />

        <button class="btn" form={formId()} type="submit">
          Save
        </button>
        <Show when={isSaved()}>
          <p>Changes were saved.</p>
        </Show>
      </div>
    </main>
  )
}

export default EditList
