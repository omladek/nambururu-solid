import { JSX, createSignal, For, Switch, Match } from 'solid-js'

import Link from '../../components/Link'
import parseStorage from '../../utilities/parseStorage'
import './Lists.css'
import getSortedList from '../../utilities/getSortedList'
import AddList from '../../components/AddList/AddList'

function Lists(): JSX.Element | null {
  const [lists, setLists] = createSignal(getSortedList(parseStorage('lists')))

  const getSubredditsTotalByList = (id: string): number => {
    return parseStorage(id).length
  }

  const removeFromLists = (id: string): void => {
    // eslint-disable-next-line no-restricted-globals, no-alert
    const result = confirm('Are you sure?')

    if (!result) {
      return
    }

    setLists((prevLists) => {
      const nextLists = prevLists.filter((list) => list !== id).filter(Boolean)

      localStorage.setItem('lists', nextLists.join(','))

      localStorage.removeItem(id)

      return nextLists
    })
  }

  const addToLists = (id: string): void => {
    setLists((prevLists) => {
      const nextLists = getSortedList([...prevLists, id])

      localStorage.setItem('lists', nextLists.join(','))

      return nextLists
    })
  }

  return (
    <main class="main">
      <h1 class="title">My lists</h1>
      <div class="block">
        <Switch>
          <Match when={lists().length}>
            <table class="lists">
              <thead>
                <tr>
                  <th>title</th>
                  <th>subreddits</th>
                  <th>actions</th>
                </tr>
              </thead>
              <tbody>
                <For each={lists()}>
                  {(list) => {
                    return (
                      <tr>
                        <td>{list}</td>
                        <td>{getSubredditsTotalByList(list)}</td>
                        <td class="lists__actions">
                          <Link
                            class="btn"
                            href={`/nambururu-solid/#/edit/?list=${list}`}
                          >
                            edit
                          </Link>
                          <button
                            class="btn"
                            onClick={() => removeFromLists(list)}
                            type="button"
                          >
                            delete
                          </button>
                        </td>
                      </tr>
                    )
                  }}
                </For>
              </tbody>
            </table>
          </Match>
          <Match when={!lists.length}>
            <p>No lists.</p>
          </Match>
        </Switch>

        <AddList lists={lists()} onSubmit={addToLists} />
      </div>
    </main>
  )
}

export default Lists
