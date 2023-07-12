import type { InfiniteData } from '@tanstack/solid-query'
import getUniqueNormalizedPosts from './getUniqueNormalizedPosts'
import type {
  ChildData,
  NormalizedPost,
} from '../types/reddit-api/ThreadsResult.type'

const transformListData = (
  data: InfiniteData<{
    posts: ChildData[]
    after: string | null
  }>,
): InfiniteData<NormalizedPost> => ({
  pages: getUniqueNormalizedPosts(data.pages),
  pageParams: data.pageParams,
})

export default transformListData
