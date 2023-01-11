import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react'
import { Container, Form, FormError, Header } from './styles'
import { ArrowRight } from 'phosphor-react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { api } from '../../lib/axios'
import { AxiosError } from 'axios'

export default function Register() {
  const registerFormSchema = z.object({
    username: z
      .string()
      .min(3, {
        message: 'O username precisa ter no minimo 3 caracteres',
      })
      .regex(/^([a-z\\-]+)$/i, {
        message: 'O username pode ter apenas letras e hífens',
      })
      .transform((username) => username.toLocaleLowerCase()),
    name: z
      .string()
      .min(3, {
        message: 'O nome precisa ter no minimo 3 caracteres',
      })
      .regex(/[a-zA-Z]/i, {
        message: 'O username pode ter apenas letras',
      }),
  })

  type RegisterFormData = z.infer<typeof registerFormSchema>

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  const router = useRouter()

  async function handleRegister(data: RegisterFormData) {
    try {
      await api.post('users', {
        name: data.name,
        username: data.username,
      })
      await router.push('register/connect-calendar')
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        alert(err.response.data.message)
        return
      }
      return console.error(err)
    }
  }

  useEffect(() => {
    if (router.query.username) {
      setValue('username', router.query.username as string)
    }
  }, [router.query?.username, setValue])

  return (
    <Container>
      <Header>
        <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>
        <MultiStep size={4} currentStep={1} />
      </Header>
      <Form as="form" onSubmit={handleSubmit(handleRegister)}>
        <label>
          <Text size="sm">Nome de usuário</Text>
          <TextInput
            placeholder="Seu nome"
            prefix="ignite.com/"
            {...register('username')}
          />
          {errors.username?.message && (
            <FormError>{errors.username.message as string}</FormError>
          )}
        </label>

        <label>
          <Text size="sm">Nome completo</Text>
          <TextInput placeholder="Seu nome" {...register('name')} />
          {errors.name?.message && (
            <FormError>{errors.name.message as string}</FormError>
          )}
        </label>
        <Button type="submit" disabled={isSubmitting}>
          Próximo passo
          <ArrowRight />
        </Button>
      </Form>
    </Container>
  )
}
