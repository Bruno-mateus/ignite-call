import { Avatar, Button, Heading, MultiStep, Text, TextArea, TextInput } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { AxiosError } from 'axios'
import { Container, Form, FormError, Header } from '../styles'
import { FormAnntotation, ProfileBox } from './styles'
import {useSession} from "next-auth/react"
import { GetServerSideProps } from 'next'
import { unstable_getServerSession } from 'next-auth/next'
import { buildNextAuthOptions } from '../../api/auth/[...nextauth].api'
import { api } from '../../../lib/axios'

export default function UpdateProfile() {
  const UpdateProfileFormSchema = z.object({
    bio:z.string()
  })

  type UpdateProfileFormData = z.infer<typeof UpdateProfileFormSchema>

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(UpdateProfileFormSchema),
  })

  const router = useRouter()
  const session = useSession()

  async function handleUpdatePorfile(data: UpdateProfileFormData) {
    await api.put('/users/profile',{
      bio:data.bio
    })

    await router.push(`/schedule/${session.data?.user.username}`)
  }



  return (
    <Container>
      <Header>
        <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>
        <MultiStep size={4} currentStep={4} />
      </Header>
      <ProfileBox as="form" onSubmit={handleSubmit(handleUpdatePorfile)}>
        <label>

        <Avatar 
        src={session.data?.user.avatar_url}
        alt={session.data?.user.name} 

        />
            
     
        </label>

        <label>
          <Text size="sm">Sobre você</Text>
          <TextArea {...register('bio')} />
         <FormAnntotation size={'sm'}> Fale um pouco sobre você. Isto será exibido  em sua página pessoal.</FormAnntotation>
        </label>
        <Button type="submit" disabled={isSubmitting}>
          Finalizar
          <ArrowRight />
        </Button>
      </ProfileBox>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req,res }) => {
  //peganso a sesstion do serverSide
  const session = await unstable_getServerSession(
    req,
    res,
    buildNextAuthOptions(req,res)
  )
  return {
    props: {
      session,
    },
  }
}