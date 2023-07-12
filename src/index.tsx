/* @refresh reload */
import { render } from 'solid-js/web'

import './index.css'
import App from './App'

const rootElement = document.querySelector<HTMLDivElement>('#root')

if (!rootElement) {
  throw new Error('Missing root element!')
}

const loaderElement =
  rootElement.querySelector<HTMLDivElement>('#initial-loader')

if (!loaderElement) {
  throw new Error('Missing loader element!')
}

rootElement.removeChild(loaderElement)

render(() => <App />, rootElement)
