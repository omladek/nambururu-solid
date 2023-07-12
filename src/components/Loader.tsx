import { mergeProps } from 'solid-js'

interface Props {
  size?: 'xs' | 'md' | 'lg'
  isFullScreen?: boolean
}

function Loader(_props: Props) {
  const props = mergeProps({ size: 'lg' }, _props)

  return (
    <span
      class={[
        'loader',
        `loader--${props.size}`,
        props.isFullScreen && 'loader--fullscreen',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      loading&hellip;
    </span>
  )
}

export default Loader
