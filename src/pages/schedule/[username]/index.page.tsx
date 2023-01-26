import { Avatar, Heading, Text } from "@ignite-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { prisma } from "../../../lib/prisma";
import { CalendarStep } from "./ScheduleForm/CalendarStep";
import { ConfirmStep } from "./ScheduleForm/ConfirmStep";
import { Container, UserHeader } from "./styles";

interface ScheduleProps{
    user:{
        name:string
        bio:string
        avatarUrl:string
    }
}

export default function Schedule({user}:ScheduleProps){
    return(
        <Container>
            <UserHeader>
                <Avatar 
                src={user.avatarUrl}
                />
                <Heading>{user.name}</Heading>
                <Text>{user.bio}</Text>
            </UserHeader>
            <ConfirmStep/>
        </Container>
    )
}

export const getStaticPaths:GetStaticPaths = async () => {
    return{
        paths:[],
        fallback:"blocking"
    }
}

export const getStaticProps:GetStaticProps = async ({params}) => {
    const username = String(params?.username);
    const user = await prisma.user.findUnique({
        where:{
            username
        }
    });

    if(!user){
        return {
            notFound: true
        }
    }

    return{
        props:{
            user:{
                name:user.name,
                bio:user.bio,
                avatarUrl:user.avatar_url
            }
        },
        revalidate:60*60*24
    }
}