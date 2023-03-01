import { Button, Text, TextArea, TextInput } from "@ignite-ui/react";
import { CalendarBlank, Clock } from "phosphor-react";
import { ConfirmForm,FormActions,FormError,FormHeader } from "./styles";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";


const confirmFormSchema= z.object({
    name: z.string().min(3,{
        message:"O nome não pode ter menos que 3 caracteres"
    }),
    email: z.string().email({message:"Digite um e-mail válido"}),
    observation: z.string().nullable(),

})

type confirmFormData =z.infer<typeof confirmFormSchema>

interface ScheduleDateAndTimeProps{
    scheduleDateAndTime:Date
}

export function ConfirmStep({scheduleDateAndTime}:ScheduleDateAndTimeProps){

const {register,handleSubmit,formState:{isSubmitting,errors}} = useForm<confirmFormData>(
    {
        resolver:zodResolver(confirmFormSchema)
    }
)

async function handleConfirmFormData(data:confirmFormData){
    console.log(data)

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
                <TextArea {...register("observation")}/>
            </label>
            <FormActions>
                <Button type="button" variant="tertiary">
                    Cancelar
                </Button>
                <Button type="submit" disabled={isSubmitting}>Confirmar</Button>
            </FormActions>
        </ConfirmForm>
    )
}