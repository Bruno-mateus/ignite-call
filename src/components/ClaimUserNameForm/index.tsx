import { Button, Text, TextInput } from '@ignite-ui/react'
import { Form, FormAnotation } from './styles'

import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

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
    formState: { errors },
  } = useForm<ClaimUserNameFormData>({
    resolver: zodResolver(claimUserNameFormSchema),
  })

  function handlePreRegister(data: ClaimUserNameFormData) {
    console.log(data)
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
        <Button size="sm" type="submit">
          Reservar
          <ArrowRight />
        </Button>
      </Form>
      <FormAnotation>
        <Text size={'sm'}>
          {errors.username
            ? errors.username.message
            : 'Digite o nome de usuario desejado'}
        </Text>
      </FormAnotation>
    </>
  )
}
