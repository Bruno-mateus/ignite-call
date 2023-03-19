import { globalCss } from '@ignite-ui/react'

export const globalStyles = globalCss({
    '*': {
        boxSizing: 'border-box',
        padding: 0,
        margin: 0,
    },
    body: {
        '-webkit-font-smoothing': 'antialiased',
        color: '$gray100',
        background: '$gray900',
    },
})
