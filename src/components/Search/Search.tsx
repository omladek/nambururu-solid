import debounce from 'lodash.debounce'
import { createQuery } from '@tanstack/solid-query'
import { For, Match, createSignal } from 'solid-js'

import Loader from '../Loader'
import './Search.css'
import getSanitizedString from '../../utilities/getSanitizedString'

interface Props {
  onSubmit: (subreddit: string) => void
  id: string
}

interface RedditNameResponse {
  names: string[]
}

function Search(props: Props) {
  const [subreddit, setSubreddit] = createSignal('')
  const inputId = `search-${props.id}`
  const listId = `list-${inputId}`

  const query = createQuery<
    RedditNameResponse,
    { message: string; reason?: string }
  >({
    queryKey: () => ['subreddit-search', subreddit()],
    queryFn: ({ signal }) =>
      fetch(
        `https://www.reddit.com/api/search_reddit_names.json?query=${subreddit()}`,
        { signal },
      ).then((response) => response.json()),
    get enabled() {
      return !!subreddit()
    },
  })

  const handleSearchSubmit = (
    event: Event & {
      currentTarget: HTMLFormElement
    },
  ) => {
    event.preventDefault()

    const subreddit = getSanitizedString(
      (new FormData(event.currentTarget).get(inputId)?.toString() || '').trim(),
    )

    if (!subreddit) {
      return
    }

    props.onSubmit(subreddit)
  }

  const handleInput = debounce(
    (event: Event & { target: HTMLInputElement }) => {
      const value = getSanitizedString(event.target.value.trim())

      if (value.length < 3) {
        return
      }

      setSubreddit(value)
    },
    300,
  )

  return (
    <form action="" class="search" method="get" onSubmit={handleSearchSubmit}>
      <fieldset>
        <label for={inputId}>search</label>
        <div class="search__group">
          <input
            autocomplete="off"
            id={inputId}
            list={listId}
            maxLength={38}
            name={inputId}
            onInput={handleInput}
            pattern="[a-zA-Z0-9_]+"
            placeholder="search subreddit"
            required
            type="search"
          />
          <datalist id={listId}>
            {!!query.data?.names?.length && (
              <For each={query.data?.names}>
                {(option) => <option value={option}>{option}</option>}
              </For>
            )}
          </datalist>
          <button
            class={`btn ${
              query.isLoading && query.isInitialLoading ? 'is-loading' : ''
            }`}
            type="submit"
          >
            <Match when={query.isLoading && query.isInitialLoading}>
              <Loader size="xs" />
            </Match>
            <span class="btn__text">🔍</span>
          </button>
        </div>
      </fieldset>
    </form>
  )
}

export default Search
