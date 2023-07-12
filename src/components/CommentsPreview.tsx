import { createQuery } from '@tanstack/solid-query'
import { JSX, Switch, createSignal, Match, For } from 'solid-js'

import Comment from './Comment/Comment'
import Loader from './Loader'
import getCommentsPreview from '../utilities/getCommentsPreview'

interface Props {
  id: string
}

function CommentsPreview(props: Props): JSX.Element | null {
  const [showComments, setShowComments] = createSignal(false)
  const query = createQuery({
    queryKey: () => ['comments', props.id],
    queryFn: ({ signal }) => getCommentsPreview(props.id, signal),
    get enabled() {
      return showComments()
    },
    cacheTime: Infinity,
    staleTime: Infinity,
  })

  return (
    <Switch>
      <Match when={!showComments() || query.isLoading}>
        <button
          class={`btn btn--block ${query.isInitialLoading ? 'is-loading' : ''}`}
          disabled={query.isInitialLoading}
          onClick={() => setShowComments(true)}
          type="button"
        >
          {query.isInitialLoading && <Loader size="xs" />}
          <span class="btn__text">Load comments</span>
        </button>
      </Match>
      <Match when={query.error}>
        <p>
          An error has occurred:
          {query.error instanceof Error && <span>{query.error.message}</span>}
        </p>
      </Match>
      <Match when={!query.data?.length}>
        <p>No relevant comments.</p>
      </Match>
      <Match when={query.isSuccess}>
        <For each={query.data}>
          {(comment) => <Comment comment={comment} />}
        </For>
      </Match>
    </Switch>
  )
}

export default CommentsPreview
