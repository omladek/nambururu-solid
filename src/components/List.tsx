import { createInfiniteQuery } from '@tanstack/solid-query'
import { createIntersectionObserver } from '@solid-primitives/intersection-observer'
import {
  For,
  JSX,
  Match,
  Switch,
  createEffect,
  createSignal,
  on,
  createMemo,
} from 'solid-js'

import getSubreddit from '../utilities/getSubreddit'
import Loader from './Loader'
import transformListData from '../utilities/transformListData'
import { SortOption } from '../constants/sortOptions'
import Post from './Post/Post'

const lazyLoadingLimit = window.matchMedia('(min-width: 40em)').matches ? 4 : 1

const postsPerPage = lazyLoadingLimit * 2

interface Props {
  subreddit: string
  sort: SortOption
}

function List(props: Props): JSX.Element {
  const query = createInfiniteQuery({
    queryKey: () => ['subreddit', props.subreddit, props.sort],
    queryFn: ({ pageParam = '', queryKey, signal }) =>
      getSubreddit({
        pageParam,
        queryKey: queryKey as ['subreddit', string, SortOption],
        signal,
      }),
    getNextPageParam: (lastPage) => lastPage.after || undefined,
    select: transformListData,
  })

  const [visiblePostsLimit, setVisiblePostsLimit] = createSignal(postsPerPage)
  const [ref, setRef] = createSignal<HTMLDivElement[]>([])

  const posts = createMemo(() => query?.data?.pages || [])
  const postsTotal = createMemo(() => posts().length)
  const visiblePosts = createMemo(() => posts().slice(0, visiblePostsLimit()))

  createIntersectionObserver(ref, (entries) => {
    entries.forEach(({ isIntersecting }) => {
      if (isIntersecting && visiblePostsLimit() < postsTotal()) {
        setVisiblePostsLimit((prev) => {
          const next = prev + postsPerPage

          if (next >= postsTotal()) {
            return postsTotal()
          }

          return next
        })
      } else if (
        isIntersecting &&
        visiblePostsLimit() === postsTotal() &&
        !query.isFetchingNextPage
      ) {
        query.fetchNextPage()
      }
    })
  })

  createEffect(
    on(
      () => postsTotal(),
      () => {
        setVisiblePostsLimit((prev) => {
          const next = prev + postsPerPage

          if (next >= postsTotal()) {
            return postsTotal()
          }

          return next
        })
      },
    ),
  )

  createEffect(
    on(
      () => [props.subreddit, props.sort],
      () => {
        setVisiblePostsLimit(postsPerPage)
      },
    ),
  )

  return (
    <Switch>
      <Match when={query.isLoading}>
        <Loader isFullScreen />
      </Match>
      <Match when={query.isError}>
        <div class="message" role="alert">
          <p>
            An error has occurred:{' '}
            {query.error instanceof Error && <span>{query.error.message}</span>}
          </p>
        </div>
      </Match>
      <Match when={query.isSuccess}>
        <Switch>
          <Match when={visiblePosts().length}>
            <div class="list">
              <For each={visiblePosts()}>
                {(post, postIndex) => (
                  <Post
                    post={post}
                    mediaLoading={
                      postIndex() + 1 <= lazyLoadingLimit ? 'eager' : 'lazy'
                    }
                  />
                )}
              </For>

              <div
                class={`load-more-area ${!query.hasNextPage ? 'done' : ''}`}
                ref={(el) => setRef([el])}
              >
                <Switch>
                  <Match when={query.hasNextPage}>
                    <Loader />
                  </Match>
                  <Match when={!query.hasNextPage}>
                    <div class="end">
                      <p>That&apos;s all</p>
                    </div>
                  </Match>
                </Switch>
              </div>
            </div>
          </Match>
          <Match when={!query?.data?.pages?.length}>
            <p class="message">No results</p>
          </Match>
        </Switch>
      </Match>
    </Switch>
  )
}

export default List
