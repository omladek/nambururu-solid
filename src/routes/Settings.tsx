import { JSX } from 'solid-js'

import Link from '../components/Link'
import parseStorage from '../utilities/parseStorage'
import Storage from '../constants/storage'

function Settings(): JSX.Element {
  return (
    <main class="main">
      <h1 class="title">Settings</h1>
      <div class="block">
        <ul>
          <li>
            <Link href="/nambururu-solid/#/lists/">My lists</Link> (
            {parseStorage('lists').length})
          </li>
          <li>
            <Link href="/nambururu-solid/#/blocked-subreddits/">
              Blocked subreddits
            </Link>{' '}
            ({parseStorage(Storage.BLOCKED_SUBREDDITS).length})
          </li>
          <li>
            <Link href="/nambururu-solid/#/blocked-title-keywords/">
              Blocked title keywords
            </Link>{' '}
            ({parseStorage(Storage.BLOCKED_TITLE_KEYWORDS).length})
          </li>
        </ul>
      </div>
    </main>
  )
}

export default Settings
