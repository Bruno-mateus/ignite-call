import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from '@ignite-ui/react'
import { Container, Header } from '../styles'

import * as z from 'zod'

import {
  IntervalContainer,
  IntervalDay,
  IntevalBox,
  IntevalInputs,
  IntevalItem,
} from './styles'
import { useForm, useFieldArray } from 'react-hook-form'
import { getDays } from '../../../utils/get-week-days'

export default function TimeIntervals() {
  const timeIntevalsSchma = z.object({})

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      intervals: [
        { weekDay: 0, enabled: false, startTime: '08:00', endTime: '18:00' },
        { weekDay: 1, enabled: false, startTime: '08:00', endTime: '18:00' },
        { weekDay: 2, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 3, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 4, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 5, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 6, enabled: true, startTime: '08:00', endTime: '18:00' },
      ],
    },
  })

  const { fields } = useFieldArray({
    control,
    name: 'intervals',
  })

  function handleSetTimeIntervals() {}

  const weekDays = getDays()
  return (
    <Container>
      <Header>
        <Heading as="strong">Conecte sua agenda!</Heading>
        <Text>
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados.
        </Text>
        <MultiStep size={4} currentStep={3} />
      </Header>
      <IntevalBox as="form" onSubmit={handleSubmit(handleSetTimeIntervals)}>
        <IntervalContainer>
          {fields.map((field) => {
            return (
              <IntevalItem key={field.id}>
                <IntervalDay>
                  <Checkbox />
                  <Text>{weekDays[field.weekDay]}</Text>
                </IntervalDay>
                <IntevalInputs>
                  <TextInput size={'sm'} type="time" step={60} />
                  <TextInput size={'sm'} type="time" step={60} />
                </IntevalInputs>
              </IntevalItem>
            )
          })}
        </IntervalContainer>
      </IntevalBox>
    </Container>
  )
}
