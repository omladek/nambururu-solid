import { JSX } from 'solid-js'

import './Header.css'
import Link from '../Link'

function Header(): JSX.Element {
  return (
    <header class="header">
      <nav class="header__nav">
        <ul class="header__nav-list">
          <li class="header__nav-list-item">
            <Link class="header__logo" href="/nambururu-solid/#/">
              Nambururu
            </Link>
          </li>
          <li class="header__nav-list-item">
            <Link
              activeClassName="is-active"
              class="header__nav-list-item-link"
              href="/nambururu-solid/#/"
            >
              Home
            </Link>
          </li>
          <li class="header__nav-list-item">
            <Link
              activeClassName="is-active"
              class="header__nav-list-item-link"
              href="/nambururu-solid/#/settings/"
            >
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
