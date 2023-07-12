import { JSX } from 'solid-js'

interface Props {
  html: string
}

function RichText(props: Props): JSX.Element {
  // eslint-disable-next-line solid/no-innerhtml
  return <div innerHTML={props.html} />
}

export default RichText
