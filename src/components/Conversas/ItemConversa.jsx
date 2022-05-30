import React from "react";
import { IconButton, Avatar,
    ListItem, ListItemButton, ListItemAvatar, ListItemText  } from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';
import { deepOrange } from '@mui/material/colors';
import { Navigate } from "react-router";


export const ItemConversa = ({ conversa }) => {
    const [redirect, setRedirect] = React.useState(false);
    function stringAvatar(name) {
        return {
          sx: {
            bgcolor: deepOrange[500],
          },
          children: name.includes(' ') ? `${name.split(' ')[0][0]}${name.split(' ')[1][0]}` : `${name.charAt(0)}`,
        };
    }


    if (redirect)
        return <Navigate to={`/conversa/${conversa.id}`}  />;

    return (
        <ListItem disablePadding
            secondaryAction={
              <IconButton edge="end" aria-label="delete">
                <ChatIcon />
              </IconButton>
            }>
            <ListItemButton role={undefined} dense onClick={() => setRedirect(true)}>
                <ListItemAvatar>
                        <Avatar {...stringAvatar(`${conversa.nome}`)} sx={{ fontWeight: "initial" }} />
                </ListItemAvatar>
              <ListItemText primary={conversa.nome} />
            </ListItemButton>
        </ListItem>
    )
}