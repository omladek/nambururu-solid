import getSortedList from './getSortedList'
import basicSubreddits, {
  type BasicSubreddit,
} from '../constants/basicSubreddits'
import parseStorage from './parseStorage'

const getSubredditsFromUserLists = (
  userLists: string[],
): Array<BasicSubreddit | string> => {
  let options: Array<BasicSubreddit | string> = [...basicSubreddits]

  userLists.forEach((list) => {
    const value = parseStorage(list)

    options = [...options, ...value]
  })

  return getSortedList([...options])
}

export default getSubredditsFromUserLists
