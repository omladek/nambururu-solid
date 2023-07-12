import { For, JSX, Show } from 'solid-js'

import { NormalizedGalleryImage } from '../types/reddit-api/ThreadsResult.type'
import Thumbnail from './Thumbnail'

interface Props {
  items: NormalizedGalleryImage[]
  mediaLoading: 'lazy' | 'eager'
}

function Gallery(props: Props): JSX.Element {
  return (
    <Show when={props.items.length}>
      <div class="gallery">
        <For each={props.items}>
          {(thumbnail, thumbnailIndex) => (
            <Thumbnail
              fullSize={thumbnail.fullSize}
              height={thumbnail.height}
              loading={thumbnailIndex() < 1 ? props.mediaLoading : 'lazy'}
              retina={thumbnail.retina}
              thumbnail={thumbnail.thumbnail}
              width={thumbnail.width}
            />
          )}
        </For>
      </div>
    </Show>
  )
}

export default Gallery
