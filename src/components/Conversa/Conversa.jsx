import React from "react";
import { Card, CardContent, TextField, CardActions, IconButton, Box, Avatar, CardHeader, Typography   } from "@mui/material";
import { deepOrange } from '@mui/material/colors';
import SendIcon from '@mui/icons-material/Send';

import { Mensagem } from "./Mensagem";

export const Conversa = () => {
    const mensagemFake = {
        id: 1,
        data: new Date().toLocaleDateString("pt-BR"),
        hora: `${new Date().getHours().toString()}:${ new Date().getMinutes().toString().includes('0') ?  new Date().getMinutes().toString() : "0" + new Date().getMinutes().toString()}` ,
        nomeUsuario: "Orugulho",
        idUsuario: "123131asda",
        mensagem: "testeste"
    }

    function stringAvatar(name) {
        return {
          sx: {
            bgcolor: deepOrange[500],
          },
          children: name.includes(' ') ? `${name.split(' ')[0][0]}${name.split(' ')[1][0]}` : `${name.charAt(0)}`,
        };
    }

    const [textoMensagem, setTextoMensagem] = React.useState('');

    return(
        <Box sx={{ py: 4 }}>
            <Card>
                <CardHeader sx={{ bgcolor : 'primary.dark' }} avatar={
                    <>
                    <Avatar {...stringAvatar('Gabriela Miranda')} sx={{ fontWeight: "initial" }} />
                    </>
                    } title={
                        <Typography component="h5" color="primary.contrastText">Gabriela Miranda</Typography>
                    }>   
                </CardHeader>
                <CardContent >
                    <Box sx={{ minHeight: '68vh', maxHeight: '68vh', overflowY: 'scroll', overflowX: 'hidden' }}>
                    {
                        Array.from({length: 35}, () => mensagemFake).map((mensagem, index) => {
                            return (<Mensagem key={index} mensagem={mensagem}/>)
                        })
                    }
                    </Box>
                </CardContent>
                <CardActions sx={{ bgcolor : 'primary.dark' }}>
                    <TextField label="Mensagem" variant="outlined" sx={{ maxHeight: "120px" }} color="primary" maxRows={4} fullWidth multiline value={textoMensagem} onChange={(e) => setTextoMensagem(e.target.value)}/>
                    <IconButton sx={{ mx: 1 }}>
                        <SendIcon sx={{ color: 'action.active'}} />
                    </IconButton>
                </CardActions>
            </Card>
        </Box>
    );
}