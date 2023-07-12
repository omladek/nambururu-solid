import { JSX } from 'solid-js'

import { NormalizedComment } from '../../types/reddit-api/CommentsResult.type'
import RichText from '../RichText'

import './Comment.css'

interface Props {
  comment: NormalizedComment
}

function Comment(props: Props): JSX.Element {
  const { text, upVotes, voteResult } = props.comment

  return (
    <section class="comment">
      <h3 class="comment__title">
        {voteResult} ({upVotes})
      </h3>

      <div class="comment__body">
        <RichText html={text} />
      </div>
    </section>
  )
}

export default Comment
