'use client'

import Link from 'next/link'
import { Wrapper } from './Button.styles'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  url?: string
}

export const Button = ({ label, url, disabled, ...props }: ButtonProps) => {
  const content = (
    <Wrapper disabled={disabled} {...props}>
      {label}
    </Wrapper>
  )

  return url && !disabled ? <Link href={url}>{content}</Link> : content
}
