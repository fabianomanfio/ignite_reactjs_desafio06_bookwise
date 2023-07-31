import { globalCss } from './stitches.config'

export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },

  body: {
    backgroundColor: '$gray800',
    color: '$gray100',
  },

  'body, input, button, textarea': {
    fontFamily: '$default',
    fontWeight: '$regular',
  }
})