import React from "react";
import { Box, Avatar, Typography, List,
    Card, CardContent, CardHeader, } from "@mui/material";
import GroupIcon from '@mui/icons-material/Group';
import { ItemConversa } from "./ItemConversa";
import { UserContext } from '../../App';
import { useSubscription } from "@apollo/client";
import { GET_USER_TALKS } from "../../services/conversas/subscriptions";


export const Conversas = () => {
    const { usuarioAtual } = React.useContext(UserContext);   
    const { data, loading, error } = useSubscription(GET_USER_TALKS, {
        variables: { userId: usuarioAtual.id }
    });
    
    if(loading){
        return (
            <div>
                Carregando...
            </div>
        )
    }

    if(error){
        console.log(error);
        return (
            <div>Erro...</div>
        )
    }

    return(
        <Box sx={{ py: 4 }}>
        <Card>
            <CardHeader sx={{ bgcolor : 'primary.dark' }} avatar={
                <>
                    <Avatar><GroupIcon></GroupIcon></Avatar>
                </>
                } title={
                    <Typography component="h5" color="primary.contrastText">Lista de Amigos</Typography>
                }>   
            </CardHeader>
            <CardContent sx={{ p: 0 }}>
                <Box sx={{ minHeight: '68vh', maxHeight: '68vh', overflowY: 'scroll', overflowX: 'hidden' }}>
                    <List component="nav" sx={{ pr: 1 }}>
                        {
                            data.talks.map((conversa, index) => {
                                return(<ItemConversa key={index} conversa={conversa}/>)
                            })
                        }
                    </List>
                </Box>
            </CardContent>
        </Card>
        </Box>
    );
}