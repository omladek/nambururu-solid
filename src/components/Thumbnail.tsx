/* eslint-disable solid/reactivity */
import { JSX, createEffect, createSignal, mergeProps } from 'solid-js'

type LazyLoading = 'lazy' | 'eager'

interface Props {
  thumbnail: string
  fullSize?: string
  height: number
  width: number
  loading?: LazyLoading
  retina?: string
}

function Thumbnail(_props: Props): JSX.Element {
  const props = mergeProps({ fullSize: '', loading: 'lazy' }, _props)
  const [showFullSize, setShowFullSize] = createSignal(!props.fullSize)
  const [srcSetSD, setSrcSetSD] = createSignal(
    showFullSize() && props.fullSize ? props.fullSize : props.thumbnail,
  )
  const [srcSetHD, setSrcSetHD] = createSignal(
    showFullSize() && props.fullSize ? props.fullSize : props.retina,
  )

  createEffect(() => {
    if (showFullSize() && props.fullSize) {
      setSrcSetSD(props.fullSize || props.thumbnail)
    }

    if (showFullSize() && props.fullSize && props.retina) {
      setSrcSetHD(props.fullSize || props.retina)
    }
  })

  const handleClick = (event: Event): void => {
    if (!showFullSize()) {
      event.preventDefault()

      setShowFullSize((prev) => !prev)
    }
  }

  return (
    <div class="thumbnail-wrap">
      <a
        class="thumbnail__link"
        href={props.fullSize || props.thumbnail}
        onClick={props.fullSize ? handleClick : undefined}
        rel="noopener noreferrer"
        style={{
          '--ar-width': props.width,
          '--ar-height': props.height,
        }}
        target="_blank"
      >
        {props.fullSize && (
          <span class="thumbnail__hd">{showFullSize() ? 'HD' : 'SD'}</span>
        )}
        <img
          alt=""
          class="thumbnail"
          decoding="async"
          height={props.height}
          loading={props.loading as LazyLoading}
          // eslint-disable-next-line sonarjs/no-nested-template-literals
          srcSet={`${srcSetSD()} 1x${props.retina ? `, ${srcSetHD()} 2x` : ''}`}
          width={props.width}
        />
      </a>
    </div>
  )
}

export default Thumbnail
