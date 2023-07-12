import { QueryClient, QueryClientProvider } from '@tanstack/solid-query'
import { Router, hashIntegration, useRoutes } from '@solidjs/router'
import { lazy } from 'solid-js'

import Home from './routes/Home'
import Header from './components/Header/Header'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
})

const routes = [
  {
    path: '/:subreddit?/:sort?',
    component: Home,
  },
  {
    path: '/settings',
    component: lazy(() => import('./routes/Settings')),
  },
  {
    path: '/lists',
    component: lazy(() => import('./routes/Lists/Lists')),
  },
  {
    path: '/edit/:list?',
    component: lazy(() => import('./routes/EditList')),
  },
  {
    path: '/blocked-title-keywords',
    component: lazy(() => import('./routes/EditBlockedTitleKeywords')),
  },
  {
    path: '/blocked-subreddits',
    component: lazy(() => import('./routes/EditBlockedSubreddits')),
  },
]

function App() {
  const Routes = useRoutes(routes)

  return (
    <QueryClientProvider client={queryClient}>
      <Router source={hashIntegration()}>
        <Header />
        <Routes />
      </Router>
    </QueryClientProvider>
  )
}

export default App
