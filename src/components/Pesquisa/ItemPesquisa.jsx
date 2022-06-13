import React from "react";
import { IconButton, Avatar,
    ListItem, ListItemButton, ListItemAvatar, ListItemText  } from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';
import { deepOrange } from '@mui/material/colors';
import { UserContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { useMutation } from "@apollo/client";
import { INICIAR_CONVERSA } from "../../services/conversas/mutation";



export const ItemPesquisa = ({ pessoa }) => {
    const { usuarioAtual } = React.useContext(UserContext);
    const [conversar] = useMutation(INICIAR_CONVERSA);
    const navigate = useNavigate();


    function stringAvatar(name) {
        return {
          sx: {
            bgcolor: deepOrange[500],
          },
          children: name.includes(' ') ? `${name.split(' ')[0][0]}${name.split(' ')[1][0]}` : `${name.charAt(0)}`,
        };
    }

    function handleIniciarConversa(){
      conversar({ variables: { userId_1: usuarioAtual.id, userId_2: pessoa.id } })
      .then(retorno => {
          const { id } = retorno.data.insert_talks.returning[0];
          navigate('/conversa/'+id);
      }).catch((error) => console.log(error));
    }

    return (
        <ListItem disablePadding
            secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={handleIniciarConversa}>
                <ChatIcon />
              </IconButton>
            }>
            <ListItemButton role={undefined} dense>
                <ListItemAvatar>
                        <Avatar {...stringAvatar(`${pessoa.name}`)} sx={{ fontWeight: "initial" }} />
                </ListItemAvatar>
              <ListItemText primary={pessoa.name} />
            </ListItemButton>
        </ListItem>
    )
}