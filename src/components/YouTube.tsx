import { JSX } from 'solid-js'

interface Props {
  width: number
  height: number
  id: string
  thumbnail: string
  posterLoading: 'lazy' | 'eager'
}

function YouTube(props: Props): JSX.Element | null {
  return (
    <a
      class="youtube"
      href={`https://www.youtube.com/watch?v=${props.id}`}
      rel="noopener noreferrer"
      style={{
        '--ar-width': props.width,
        '--ar-height': props.height,
      }}
      target="_blank"
    >
      <img
        alt=""
        class="youtube__logo"
        decoding="async"
        height="60"
        loading={props.posterLoading}
        srcSet="https://satyr.dev/80x60/FF0000?brand=youtube 1x, https://satyr.dev/160x120/FF0000?brand=youtube 2x"
        width="80"
      />
      <img
        alt=""
        class="youtube__thumbnail"
        decoding="async"
        height={props.height}
        loading={props.posterLoading}
        src={props.thumbnail}
        width={props.width}
      />
    </a>
  )
}

export default YouTube
