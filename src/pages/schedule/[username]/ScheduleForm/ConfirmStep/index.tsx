import { Button, Text, TextArea, TextInput } from "@ignite-ui/react";
import { CalendarBlank, Clock } from "phosphor-react";
import { ConfirmForm,FormActions,FormError,FormHeader } from "./styles";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { api } from "../../../../../lib/axios";
import { useRouter } from "next/router";



const confirmFormSchema= z.object({
    name: z.string().min(3,{
        message:"O nome não pode ter menos que 3 caracteres"
    }),
    email: z.string().email({message:"Digite um e-mail válido"}),
    observations: z.string().nullable(),

})

type confirmFormData =z.infer<typeof confirmFormSchema>

interface ScheduleDateAndTimeProps{
    scheduleDateAndTime:Date,
    closeConfirmStep:(value:null)=>void
}

export function ConfirmStep({scheduleDateAndTime,closeConfirmStep}:ScheduleDateAndTimeProps){

const {register,handleSubmit,formState:{isSubmitting,errors}} = useForm<confirmFormData>(
    {
        resolver:zodResolver(confirmFormSchema)
    }
)

const router = useRouter()

const username = String(router.query.username)



async function handleConfirmFormData(data:confirmFormData){



    const {
        email,
        name,
        observations
    } = data

    await api.post(`/users/${username}/schedule`,{
        email,
        name,
        observations,
        date:scheduleDateAndTime
    })
    closeFormConfirmStep()
}

    function closeFormConfirmStep(){
        closeConfirmStep(null)
    }

    const describedDate = dayjs(scheduleDateAndTime).format("DD[ de ]MMMM[ de ]YYYY")
    const describeTime = dayjs(scheduleDateAndTime).format("HH:mm[h]")
    return(
        <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmFormData)}>
            <FormHeader>
                <Text>
                    <CalendarBlank/>
                    {describedDate}
                </Text>
                <Text>
                    <Clock/>
                    {describeTime}
                </Text>
            </FormHeader>
            <label>
                <Text size="sm">Nome completo</Text>
                <TextInput placeholder="Seu nome" {...register('name')}/>
                {
                errors.name?.message?(
                    <FormError size={'sm'}>{errors.name?.message}</FormError>
                ):""
            }
            </label>

            <label>
                <Text size="sm">Endereço de e-mail</Text>
                <TextInput placeholder="johndee@example.com" type="email" {...register("email")}/>
                {
                errors.email?.message?(
                    <FormError size={'sm'}>{errors.email?.message}</FormError>
                ):""
            }
            </label>

            <label>
                <Text size={"sm"}>Observações</Text>
                <TextArea {...register("observations")}/>
            </label>
            <FormActions>
                <Button type="button" variant="tertiary" onClick={()=>closeFormConfirmStep()}>
                    Cancelar
                </Button>
                <Button type="submit" disabled={isSubmitting}>Confirmar</Button>
            </FormActions>
        </ConfirmForm>
    )
}