import React from "react";
import { getAuth  } from "firebase/auth";
import { Box, Avatar, Typography, List,
    Card, CardContent, CardHeader, } from "@mui/material";
import GroupIcon from '@mui/icons-material/Group';
import { ItemPesquisa } from "./ItemPesquisa";

export const Pesquisa = () => {
    const pessoaFake = {
        id: 1,
        nome: "RRIQUE"
    }
    console.log(getAuth());

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
                            Array.from({length: 35}, () => pessoaFake).map((pessoa, index) => {
                                return(<ItemPesquisa key={index} pessoa={pessoa}/>)
                            })
                        }
                    </List>
                </Box>
            </CardContent>
        </Card>
        </Box>
    );
}