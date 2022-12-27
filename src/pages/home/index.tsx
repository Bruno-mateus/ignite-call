import { Heading, Text } from '@ignite-ui/react'
import { Container, Hero, Preview } from './styles'
import previewImage from '../../../public/assets/preview.png'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <Container>
        <Hero>
          <Heading as="h1" size="4xl">
            Agendamento descomplicado
          </Heading>
          <Text size="xl">
            Conecte seu calendário e permita que as pessoas marquem agendamentos
            no seu tempo livre.
          </Text>
        </Hero>
        <Preview>
          <Image
            src={previewImage.src}
            height={400}
            width={600}
            quality={100}
            priority
            alt="Calendario simbolizando aplicação em funcionamento"
          />
        </Preview>
      </Container>
    </>
  )
}
