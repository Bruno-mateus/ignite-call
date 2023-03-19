import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { Container, Header } from '../styles'
import { ArrowRight, Check } from 'phosphor-react'
import { signIn, useSession } from 'next-auth/react'
// import { AxiosError } from 'axios'
// import { api } from '../../../lib/axios'
import { AuthError, ConnectBox, ConnectItem } from './styles'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

export default function ConnecetCalendar() {
  const router = useRouter()
  const session = useSession()

  const hasAuthError = router.query.error
  const isSignedIn = session.status === 'authenticated'

  async function handleConnectCallendar() {
    
    await signIn('google')
  }
  return (
    <Container>
    <NextSeo
      title="Contecte seu calendário | Ignite Call"
      description="Conecte seu calendário e permita que as pessoas marquem agendamentos no seu tempo livre."
      noindex
    />
      <Header>
        <Heading as="strong">Conecte sua agenda!</Heading>
        <Text>
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados.
        </Text>
        <MultiStep size={4} currentStep={2} />
      </Header>
      <ConnectBox>
        <ConnectItem>
          <Text>Google Calendar</Text>
          {isSignedIn ? (
            <Button
              variant={'primary'}
              size="sm"
              disabled={isSignedIn}
              onClick={() => signIn('google')}
            >
              conectado
              <Check />
            </Button>
          ) : (
            <Button
              variant={'secondary'}
              size="sm"
              onClick={handleConnectCallendar}
            >
              conectar
              <ArrowRight />
            </Button>
          )}
        </ConnectItem>
        {hasAuthError && (
          <AuthError size="sm">
            Falha ao se conectar ao google, verifique se você habilitou as
            permissões de acesso ao Google Calendar
          </AuthError>
        )}

        <Button disabled={!isSignedIn} onClick={()=>{
          location.href="/register/time-intervals"
        }}>
          Próximo passo
          <ArrowRight />
        </Button>
      </ConnectBox>
    </Container>
  )
}
