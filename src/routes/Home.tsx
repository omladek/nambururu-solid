import { useNavigate, useSearchParams } from '@solidjs/router'
import { createSignal, createEffect, on } from 'solid-js'

import Filters from '../components/Filters/Filters'
import sortOptions, { SortOption } from '../constants/sortOptions'
import List from '../components/List'
import parseStorage from '../utilities/parseStorage'
import basicSubreddits from '../constants/basicSubreddits'

const Home = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [selectedSubreddit, setSelectedSubreddit] = createSignal(
    searchParams.subreddit || parseStorage('lists')[0] || basicSubreddits[0],
  )
  const [selectedSort, setSelectedSort] = createSignal<SortOption>(
    searchParams.sort as SortOption,
  )

  createEffect(
    on(
      () => searchParams.subreddit,
      () => {
        setSelectedSubreddit(
          searchParams.subreddit ||
            parseStorage('lists')[0] ||
            basicSubreddits[0],
        )
      },
    ),
  )

  createEffect(
    on(
      () => searchParams.sort,
      () => {
        setSelectedSort((searchParams.sort as SortOption) || sortOptions[0])
      },
    ),
  )

  return (
    <>
      <main class="main">
        <h1 class="title">
          {selectedSubreddit()} ({selectedSort()})
        </h1>
        <List sort={selectedSort()} subreddit={selectedSubreddit()} />
      </main>
      <Filters
        onSort={(nextSort) => {
          navigate(`/?subreddit=${selectedSubreddit()}&sort=${nextSort}`)
        }}
        onSubmit={(nextSubreddit) => {
          navigate(`/?subreddit=${nextSubreddit}&sort=best`)
        }}
      />
    </>
  )
}

export default Home
