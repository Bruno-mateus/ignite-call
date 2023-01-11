import { Button, Text, TextInput } from '@ignite-ui/react'
import { Form, FormAnotation, FormError } from './styles'

import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Router from 'next/router'

export function ClaimUsernameForm() {
  const claimUserNameFormSchema = z.object({
    username: z
      .string()
      .min(3, {
        message: 'O username precisa ter no minimo 3 caracteres',
      })
      .regex(/^([a-z\\-]+)$/i, {
        message: 'O username pode ter apenas letras e hífens',
      })
      .transform((username) => username.toLocaleLowerCase()),
  })

  type ClaimUserNameFormData = z.infer<typeof claimUserNameFormSchema>

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClaimUserNameFormData>({
    resolver: zodResolver(claimUserNameFormSchema),
  })

  async function handlePreRegister({ username }: ClaimUserNameFormData) {
    await Router.push(`/register?username=${username}`)
  }

  return (
    <>
      <Form as="form" onSubmit={handleSubmit(handlePreRegister)}>
        <TextInput
          size={'sm'}
          prefix="ignite.com/"
          placeholder="seu-usuario"
          {...register('username')}
        />
        <Button size="sm" type="submit" disabled={isSubmitting}>
          Reservar
          <ArrowRight />
        </Button>
      </Form>
      <FormAnotation>
        {errors.username ? (
          <FormError>{errors.username.message}</FormError>
        ) : (
          <Text>Digite o nome de usuario desejado</Text>
        )}
      </FormAnotation>
    </>
  )
}
