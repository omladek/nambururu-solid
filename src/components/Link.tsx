import { useNavigate } from '@solidjs/router'
import { JSX } from 'solid-js'

interface Props {
  children: JSX.Element | string
  class?: string
  activeClassName?: string
  href: string
}

export default function Link(props: Props) {
  const navigate = useNavigate()
  const baseUrl = props.href.replace('/nambururu-solid/#/', '/')
  const isActive = false
  const classNames = [props.class, isActive && props.activeClassName]
    .filter(Boolean)
    .join(' ')

  return (
    <a
      class={classNames}
      href={props.href}
      onClick={(event) => {
        event.preventDefault()
        navigate(baseUrl)
      }}
    >
      {props.children}
    </a>
  )
}
