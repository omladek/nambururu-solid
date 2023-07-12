import { For, JSX, Show } from 'solid-js'

import './Tags.css'

interface Props {
  value: string
  onClick: (tag: string) => void
}

function Tags(props: Props): JSX.Element | null {
  const tags = (props.value || '').split(',').filter(Boolean)

  return (
    <Show when={tags.length}>
      <div class="tags">
        <For each={tags}>
          {(tag) => {
            return (
              <button
                class="btn tags__tag"
                onClick={() => {
                  props.onClick(tag)
                }}
                type="button"
              >
                {tag}
              </button>
            )
          }}
        </For>
      </div>
    </Show>
  )
}

export default Tags
