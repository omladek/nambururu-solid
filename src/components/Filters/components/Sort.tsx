import { For } from 'solid-js'

import parseSortFromURL from '../../../utilities/parseSortFromURL'
import sortOptions, { SortOption } from '../../../constants/sortOptions'

interface Props {
  onChange: (sort: SortOption) => void
}

function Sort(props: Props) {
  const defaultSort = parseSortFromURL(window.location.href) || sortOptions[0]

  return (
    <form action="" method="get">
      <fieldset>
        <label for="sort">sort</label>
        <select
          value={defaultSort}
          id="sort"
          name="sort"
          onChange={({ currentTarget }) =>
            props.onChange(currentTarget.value as SortOption)
          }
        >
          <option disabled>choose</option>
          <For each={sortOptions}>
            {(option) => <option value={option}>{option}</option>}
          </For>
        </select>
      </fieldset>
    </form>
  )
}

export default Sort
