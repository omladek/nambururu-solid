/* eslint-disable solid/components-return-once */
/* eslint-disable solid/reactivity */
import { JSX } from 'solid-js'

import { NormalizedPostMedia } from '../types/reddit-api/ThreadsResult.type'
import Gallery from './Gallery'
import Thumbnail from './Thumbnail'
import VideoPlayer from './VideoPlayer'
import YoutTube from './YouTube'

interface Props {
  media: NormalizedPostMedia
  mediaLoading: 'lazy' | 'eager'
}

function Media(props: Props): JSX.Element | null {
  if (!props.media?.type) {
    return null
  }

  switch (props.media.type) {
    case 'normalizedVideo': {
      return (
        <VideoPlayer
          hasAudio={props.media.hasAudio}
          height={props.media.height}
          poster={props.media.poster}
          posterLoading={props.mediaLoading}
          url={props.media.url}
          width={props.media.width}
        />
      )
    }

    case 'singleImage': {
      return (
        <Thumbnail
          fullSize={props.media.fullSize || undefined}
          height={props.media.height}
          loading={props.mediaLoading}
          retina={props.media.retina}
          thumbnail={props.media.thumbnail}
          width={props.media.width}
        />
      )
    }

    case 'gallery': {
      return (
        <Gallery items={props.media.items} mediaLoading={props.mediaLoading} />
      )
    }

    case 'youtube': {
      return (
        <YoutTube
          height={props.media.height}
          id={props.media.id}
          posterLoading={props.mediaLoading}
          thumbnail={props.media.thumbnail}
          width={props.media.width}
        />
      )
    }

    case 'externalLink': {
      return (
        <a
          class="post-link"
          href={props.media.url}
          rel="noopener noreferrer"
          target="_blank"
        >
          <img
            alt=""
            class="post-link__logo"
            decoding="async"
            height="50"
            loading={props.mediaLoading}
            src={props.media.image}
            width="50"
          />
        </a>
      )
    }

    case 'thumbnail':
    case 'previewImage': {
      return (
        <Thumbnail
          height={props.media.height}
          loading={props.mediaLoading}
          thumbnail={props.media.url}
          width={props.media.width}
        />
      )
    }

    default: {
      return null
    }
  }
}

export default Media
