'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'

import { useAuthStore } from '@/entities/auth'
import { Button, Input, ErrorMessage } from '@/shared/ui-kit'
import { useErrorStore, useError } from '@/shared/lib'

import s from './LoginForm.module.scss'
import { useTranslations } from 'next-intl'
import { loginSchema, LoginSchemaType } from '@/shared/lib/zodValidation'

export const LoginForm = () => {
  const { signIn, loading } = useAuthStore()
  const router = useRouter()
  const serverError = useErrorStore((state) => state.serverError)
  const clearServerError = useErrorStore((state) => state.clearServerError)
  const t = useTranslations('validation')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  })

  const { translatedError } = useError(serverError, errors)

  const onSubmit = async (data: LoginSchemaType) => {
    clearServerError()
    try {
      await signIn(data.username, data.password)
      router.push('/')
    } catch {}
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className={s.form}>
      <h3 className={s.title}>Login</h3>
      <Input
        type="text"
        placeholder="Username"
        {...register('username')}
        hasError={!!errors.username || !!serverError}
      />
      <ErrorMessage message={errors.username?.message} />

      <Input
        type="password"
        placeholder="Password"
        {...register('password')}
        hasError={!!errors.password || !!serverError}
      />
      <ErrorMessage message={errors.password?.message} />

      {translatedError && !errors.username && !errors.password && (
        <ErrorMessage message={translatedError} />
      )}

      <Button variant={'primary'} type="submit" disabled={loading} className={s.button}>
        {loading ? 'Загрузка...' : 'Войти'}
      </Button>
    </form>
  )
}
