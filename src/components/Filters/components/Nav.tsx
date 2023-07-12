import { For } from 'solid-js'

import getSubredditsFromUserLists from '../../../utilities/getSubredditsFromUserLists'
import parseSubredditFromURL from '../../../utilities/parseSubredditFromURL'
import parseStorage from '../../../utilities/parseStorage'
import basicSubreddits from '../../../constants/basicSubreddits'

interface Props {
  onChange: (subreddit: string) => void
}

function Nav(props: Props) {
  const defaultSubreddit =
    parseSubredditFromURL(window.location.href) || basicSubreddits[0]
  const userLists = parseStorage('lists') || []
  const subreddits = getSubredditsFromUserLists(userLists)

  return (
    <form action="" method="get">
      <fieldset>
        <label for="subreddit-select">r/</label>
        <select
          id="subreddit-select"
          name="subreddit-select"
          onChange={(event) => props.onChange(event.target.value)}
          value={defaultSubreddit}
        >
          <option disabled>choose</option>
          {!!userLists.length && (
            <optgroup label="my lists">
              <For each={userLists}>
                {(userList) => <option value={userList}>{userList}</option>}
              </For>
            </optgroup>
          )}

          <optgroup label="subreddits">
            <For each={subreddits}>
              {(subreddit) => <option value={subreddit}>{subreddit}</option>}
            </For>
          </optgroup>
        </select>
      </fieldset>
    </form>
  )
}

export default Nav
