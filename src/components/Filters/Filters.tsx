import Sort from './components/Sort'
import Nav from './components/Nav'
import Search from '../Search/Search'
import './Filters.css'
import { SortOption } from '../../constants/sortOptions'

interface Props {
  onSubmit: (subreddit: string) => void
  onSort: (sort: SortOption) => void
}

function Filters(props: Props) {
  return (
    <footer class="filters">
      <Search id="suggestions" onSubmit={props.onSubmit} />

      <Nav onChange={(subreddit) => props.onSubmit(subreddit)} />

      <Sort onChange={props.onSort} />
    </footer>
  )
}

export default Filters
