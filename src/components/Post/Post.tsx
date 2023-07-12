import { createVisibilityObserver } from '@solid-primitives/intersection-observer'
import { JSX, Match, Show, Switch, createSignal } from 'solid-js'

import { NormalizedPost } from '../../types/reddit-api/ThreadsResult.type'
import CommentsPreview from '../CommentsPreview'
import RichText from '../RichText'
import './Post.css'
import Link from '../Link'
import Media from '../Media'

interface Props {
  post: NormalizedPost
  mediaLoading: 'lazy' | 'eager'
}

function Post(props: Props): JSX.Element {
  const {
    commentsTotalFormatted,
    createdDate,
    description,
    domain,
    downVotes,
    externalLink,
    hasComments,
    id,
    media,
    permalink,
    subreddit,
    title,
    upVotes,
  } = props.post

  const [isLoaded, setIsLoaded] = createSignal(props.mediaLoading === 'eager')
  const [showContent, setShowContent] = createSignal(
    props.mediaLoading === 'eager',
  )
  const [hasMinHeight, setHasMinHeight] = createSignal(false)
  let el: HTMLDivElement | undefined

  const useVisibilityObserver = createVisibilityObserver(undefined, (entry) => {
    if (entry.isIntersecting) {
      setIsLoaded(true)
      setShowContent(true)
    }

    if (!entry.isIntersecting && isLoaded()) {
      setShowContent(false)
    }

    if (isLoaded() && el && !hasMinHeight()) {
      const { offsetHeight } = el

      el.style.setProperty('--minHeight', `${Math.ceil(offsetHeight)}px`)

      setHasMinHeight(true)
    }

    return entry.isIntersecting
  })

  useVisibilityObserver(() => el)

  return (
    <article class={`post is-${props.mediaLoading}`} ref={el}>
      <Show when={isLoaded() && showContent()}>
        <Media media={media} mediaLoading={props.mediaLoading} />

        <div class="post__info">
          <h2 class="post__title">
            <a
              class="post__link"
              href={permalink}
              rel="noopener noreferrer"
              target="_blank"
            >
              {title}
            </a>
          </h2>

          <Show when={Boolean(description)}>
            <div class="post__description">
              <RichText html={description} />
            </div>
          </Show>

          <dl class="post__data">
            <dt class="sr-only">date:</dt>

            <dd class="post__time">
              <time>{createdDate}</time>
            </dd>

            <dt class="sr-only">subreddit:</dt>

            <dd>
              <Link
                class="post__subreddit-link"
                href={`/nambururu-solid/#/?subreddit=${subreddit}&sort=best`}
              >
                {`r/${subreddit}`}
              </Link>
            </dd>

            <dt>
              <span class="sr-only">domain:</span>
              <span aria-hidden>🌐</span>
            </dt>

            <dd class="post__domain">
              <Switch>
                <Match when={externalLink}>
                  <a
                    href={String(externalLink)}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {domain}
                  </a>
                </Match>

                <Match when={!externalLink}>
                  {domain.replace(/^self./, '')}
                </Match>
              </Switch>
            </dd>

            <dt>
              <span aria-hidden>💬</span>
              <span class="sr-only">comments:</span>
            </dt>

            <dd>{commentsTotalFormatted}</dd>

            <dt>
              <span aria-hidden>⬆️</span>
              <span class="sr-only">upvotes:</span>
            </dt>

            <dd>{upVotes}</dd>

            <dt>
              <span aria-hidden>⬇️</span>
              <span class="sr-only">downvotes:</span>
            </dt>

            <dd>{downVotes}</dd>
          </dl>

          <Show when={hasComments}>
            <div class="post__comments">
              <CommentsPreview id={id} />
            </div>
          </Show>
        </div>
      </Show>
    </article>
  )
}

export default Post
