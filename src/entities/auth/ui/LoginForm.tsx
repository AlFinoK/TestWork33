'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'

import { useAuthStore } from '@/entities/auth'
import { useErrorStore, useError, loginSchema, LoginSchemaType } from '@/shared/lib'
import { Button, Input, ErrorMessage } from '@/shared/ui-kit'

import s from './LoginForm.module.scss'

export const LoginForm = () => {
  const { signIn, loading } = useAuthStore()
  const router = useRouter()
  const { serverError, clearServerError } = useErrorStore()
  const t = useTranslations('login')
  const { translatedError } = useError(serverError)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginSchemaType) => {
    clearServerError()
    try {
      await signIn(data.username, data.password)
      router.push('/products')
    } catch {}
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className={s.form}>
      <h3 className={s.title}>{t('title')}</h3>

      <Input
        type="text"
        placeholder={t('usernamePlaceholder')}
        {...register('username')}
        hasError={!!errors.username || !!serverError}
      />
      <ErrorMessage
        message={errors.username ? t(`errors.${errors.username.message}`) : undefined}
      />

      <Input
        type="password"
        placeholder={t('passwordPlaceholder')}
        {...register('password')}
        hasError={!!errors.password || !!serverError}
      />
      <ErrorMessage
        message={errors.password ? t(`errors.${errors.password.message}`) : undefined}
      />

      {translatedError && !errors.username && !errors.password && (
        <ErrorMessage message={t(translatedError)} />
      )}

      <Button variant="primary" type="submit" disabled={loading} className={s.button}>
        {loading ? t('loading') : t('submit')}
      </Button>
    </form>
  )
}
