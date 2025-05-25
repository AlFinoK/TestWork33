'use client'

import { forwardRef, InputHTMLAttributes, useState } from 'react'
import clsx from 'clsx'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid'

import s from './Input.module.scss'
import { Button } from '../Button'

type Variant = 'primary' | 'secondary'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  variant?: Variant
  hasError?: boolean
  icon?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ className, variant = 'primary', hasError = false, type, icon, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    const isPasswordType = type === 'password'
    const inputType = isPasswordType && showPassword ? 'text' : type

    return (
      <div className={clsx(s.wrapper, 'relative')}>
        {icon && <span className={s.icon}>{icon}</span>}

        <input
          ref={ref}
          type={inputType}
          className={clsx(s.input, s[variant], { [s.error]: hasError }, className)}
          {...props}
        />

        {isPasswordType && (
          <Button
            variant="clear"
            type="button"
            className={s.toggle}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
          </Button>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'
