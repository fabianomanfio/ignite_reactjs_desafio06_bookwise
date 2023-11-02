import { Button } from '@/components/Button';
import { styled } from '@/styles/stitches.config';


export const Container = styled('div', {
  height: '100%',
  width: '100%',
  display: 'flex',
})

export const ImageContainer = styled('div', {
  margin: '$5 0 $5 $5'
})

export const LoginContainer = styled('div', {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  // gap: '$4',

  '> div': {
    display: 'flex',
    flexDirection: 'column',
    gap: '$10',
  }
})

export const ButtonContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

})

export const Heading = styled('div', {
  h1: {
    lineHeight: '$short'
  },

  span: {
    lineHeight: '$base',
    color: '$gray200',
  }
})
