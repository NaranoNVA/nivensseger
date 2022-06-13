import React from "react";
import { Card, CardContent, TextField, CardActions, IconButton, Box, Avatar, CardHeader, Typography   } from "@mui/material";
import { deepOrange } from '@mui/material/colors';
import SendIcon from '@mui/icons-material/Send';

import { UserContext } from '../../App';
import { Mensagem } from "./Mensagem";
import { useParams } from "react-router";
import { useSubscription, useQuery, useMutation } from "@apollo/client";
import { GET_MESSAGES_TALK } from "../../services/conversas/subscriptions";
import { GET_TALK } from "../../services/conversas/query";
import { ENVIAR_MENSAGEM } from "../../services/conversas/mutation";

export const Conversa = () => {
    const [textoMensagem, setTextoMensagem] = React.useState('');
    const {usuarioAtual} = React.useContext(UserContext);
    const [envirMensagem] = useMutation(ENVIAR_MENSAGEM);
    const params = useParams();

    const { data, loading, error } = useSubscription(GET_MESSAGES_TALK, {
        variables: { talkId: params.conversaId }
    });

    const Talk = useQuery(GET_TALK, {
        variables: { id: params.conversaId }
    });

    function stringAvatar(name) {
        return {
          sx: {
            bgcolor: deepOrange[500],
          },
          children: name.includes(' ') ? `${name.split(' ')[0][0]}${name.split(' ')[1][0]}` : `${name.charAt(0)}`,
        };
    }

    function setaNome(){
        if(Talk.loading)
            return "Loading";
        else if(Talk.error){
            console.log(Talk.error);
            return "Erro";
        }else
            return Talk.data.talks[0].user_1.id !== usuarioAtual.id ? Talk.data.talks[0].user_1.name : Talk.data.talks[0].user_2.name;  
    }

    if(loading)
        return(<div>Carregando...</div>);

    if(error){
        console.log(error);
        return(<div>Erro</div>);
    }

    function handleEnviarMensagem(){
        envirMensagem({ variables: { userId: usuarioAtual.id, talkId: params.conversaId, message: textoMensagem} })
        .then(() =>
            setTextoMensagem("")
        )
        .catch( (error) =>
            console.log(error)
        );
    }

    return(
        <Box sx={{ py: 4 }}>
            <Card>
                <CardHeader sx={{ bgcolor : 'primary.dark' }} avatar={
                    <>
                    <Avatar {...stringAvatar(setaNome())} sx={{ fontWeight: "initial" }} />
                    </>
                    } title={
                        <Typography component="h5" color="primary.contrastText">{setaNome()}</Typography>
                    }>   
                </CardHeader>
                <CardContent >
                    <Box sx={{ minHeight: '68vh', maxHeight: '68vh', overflowY: 'scroll', overflowX: 'hidden' }}>
                    {
                        data.messages.map((mensagem, index) => {
                            return (<Mensagem key={index} mensagem={mensagem}/>)
                        })
                    }
                    </Box>
                </CardContent>
                <CardActions sx={{ bgcolor : 'primary.dark' }}>
                    <TextField label="Mensagem" variant="outlined" sx={{ maxHeight: "120px" }} color="primary" maxRows={4} fullWidth multiline value={textoMensagem} onChange={(e) => setTextoMensagem(e.target.value)}/>
                    <IconButton sx={{ mx: 1 }} onClick={handleEnviarMensagem} disabled={textoMensagem.length === 0}>
                        <SendIcon sx={{ color: 'action.active'}} />
                    </IconButton>
                </CardActions>
            </Card>
        </Box>
    );
}