import { Box, styled, Text } from "@ignite-ui/react";

export const ProfileBox = styled(Box,{
    margintop:"$6",
    display:"flex",
    flexDirection:"column",
    gap:"$4",
    label:{
        display:'flex',
        flexDirection:'column',
        gap:"$2"
    }
})
export const FormAnntotation = styled(Text,{
    color:"$gray200"
})
