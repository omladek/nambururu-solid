import { JSX } from 'solid-js'
import getSanitizedString from '../../utilities/getSanitizedString'

interface Props {
  onSubmit: (listId: string) => void
  lists: string[]
}

function AddList(props: Props): JSX.Element {
  const inputId = 'list-name'

  const handleSubmit = (event: Event & { currentTarget: HTMLFormElement }) => {
    event.preventDefault()

    const listName = getSanitizedString(
      (new FormData(event.currentTarget).get(inputId)?.toString() || '').trim(),
    )

    if (!listName) {
      return
    }

    const isExisting = props.lists.includes(listName)

    if (isExisting) {
      // eslint-disable-next-line no-alert
      alert(
        `List "${listName}" already exists! Please choose a different name.`,
      )
      return
    }

    props.onSubmit(listName)
  }

  return (
    <form action="" method="get" onSubmit={handleSubmit}>
      <fieldset>
        <legend>Create new list</legend>
        <label for={inputId}>Name</label>
        <input
          autocomplete="off"
          id={inputId}
          maxLength={38}
          name={inputId}
          pattern="[a-zA-Z0-9_-]"
          required
          type="text"
        />
        <p>
          <small>Allowed: letters, numbers, underscore, hyphen</small>
        </p>
        <button class="btn" type="submit">
          Create
        </button>
      </fieldset>
    </form>
  )
}

export default AddList
