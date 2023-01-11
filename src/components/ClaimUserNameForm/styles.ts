import { Box, Text, styled } from '@ignite-ui/react'

export const Form = styled(Box, {
  marginTop: '$4',
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  gap: '$2',
  padding: '$4',
  '@media (max-width:600px)': {
    gridTemplateColumns: '1fr',
    flex: 1,
  },
})

export const FormAnotation = styled('div', {
  marginTop: '$2',
  [`>${Text}`]: {
    color: '$gray400',
  },
})
export const FormError = styled(Text, {
  color: '#f75a68 !important',
})
