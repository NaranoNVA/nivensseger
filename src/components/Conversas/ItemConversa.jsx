import React from "react";
import { UserContext } from '../../App';
import { IconButton, Avatar,
    ListItem, ListItemButton, ListItemAvatar, ListItemText  } from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';
import { deepOrange } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';


export const ItemConversa = ({ conversa }) => {
    const {usuarioAtual} = React.useContext(UserContext);
    const navigate = useNavigate();

    function stringAvatar(name) {
        return {
          sx: {
            bgcolor: deepOrange[500],
          },
          children: name.includes(' ') ? `${name.split(' ')[0][0]}${name.split(' ')[1][0]}` : `${name.charAt(0)}`,
        };
    }

    function setaNome(){
      return conversa.user_1.id !== usuarioAtual.id ? conversa.user_1.name : conversa.user_2.name
    }


    function handleVerConversa(){
        navigate(`/conversa/${conversa.id}`);
    }

    return (
        <ListItem disablePadding
            secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={handleVerConversa}>
                <ChatIcon />
              </IconButton>
            }>
            <ListItemButton role={undefined} dense onClick={handleVerConversa}>
                <ListItemAvatar>
                        <Avatar {...stringAvatar(`${setaNome()}`)} sx={{ fontWeight: "initial" }} />
                </ListItemAvatar>
              <ListItemText primary={setaNome()} />
            </ListItemButton>
        </ListItem>
    )
}