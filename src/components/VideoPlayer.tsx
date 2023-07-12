import { JSX, createEffect, createSignal, Show } from 'solid-js'
import syncMediaPlayback from '../utilities/syncMediaPlayback'

interface Props {
  url: string
  height: number
  width: number
  hasAudio: boolean
  poster: string
  posterLoading: 'lazy' | 'eager'
}

function VideoPlayer(props: Props): JSX.Element {
  let videoRef: HTMLVideoElement | undefined
  let audioRef: HTMLAudioElement | undefined
  const [isLoaded, setIsLoaded] = createSignal(false)
  const audioUrl = props.url.replace(/_\d+/, '_audio')

  createEffect(() => {
    if (videoRef && audioRef) {
      syncMediaPlayback(videoRef, audioRef)
    }

    if (videoRef) {
      videoRef.play()
    }

    if (audioRef) {
      audioRef.play()
    }
  })

  return (
    <div
      class="thumbnail-wrap thumbnail-wrap--video"
      style={{ '--ar-width': props.width, '--ar-height': props.height }}
    >
      <Show when={!isLoaded()}>
        <button
          aria-label="play video"
          class="thumbnail__btn"
          onClick={() => setIsLoaded((prev) => !prev)}
          type="button"
        >
          ▶
        </button>
        <Show when={props.poster}>
          <img
            alt=""
            class="thumbnail thumbnail--video"
            decoding="async"
            height={props.height}
            loading={props.posterLoading}
            src={props.poster}
            width={props.width}
          />
        </Show>
        <Show when={!props.poster}>
          <div class="thumbnail__bg" />
        </Show>
      </Show>
      <Show when={isLoaded()}>
        <video
          class=""
          controls
          height={props.height}
          muted
          playsinline
          ref={videoRef}
          width={props.width}
        >
          <source src={props.url} type="video/mp4" />
        </video>
        <Show when={props.hasAudio}>
          <audio
            class="audio"
            controls
            muted
            preload="none"
            ref={audioRef}
            src={audioUrl}
          />
        </Show>
      </Show>
    </div>
  )
}

export default VideoPlayer
