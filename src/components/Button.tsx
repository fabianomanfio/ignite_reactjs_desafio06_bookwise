import { styled } from '@/styles/stitches.config';
import Image from "next/image"
import React, { ReactNode } from 'react';

enum Size {
  sm = "sm",
  lg = "lg",
}

const ButtonContainer = styled('button', {
  all: 'unset',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$5',
  borderRadius: '8px',
  backgroundColor: '$gray600',
  cursor: 'pointer',
  fontWeight: '$bold',
  width: '100%',

  
  '&:disabled': {
    cursor: 'not-allowed',
    backgroundColor: '$gray700',
    color: '$gray600',

    img: {
      opacity: 0.5
    }
  },

  variants: {
    size: {
      sm: {
        padding: '$2'
      },

      lg: {
        padding: '$4 $5'
      },
    },
  }

})

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string
  icon?: ReactNode
  size: Size 
}

export function Button({ title, size, icon, ...props }: ButtonProps) {
  return (
    <ButtonContainer size={size} {...props}>
      {icon}
      {title}
    </ButtonContainer>
  )
}