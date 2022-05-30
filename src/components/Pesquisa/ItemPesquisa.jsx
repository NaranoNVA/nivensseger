import React from "react";
import { IconButton, Avatar,
    ListItem, ListItemButton, ListItemAvatar, ListItemText  } from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { deepOrange } from '@mui/material/colors';
import { Navigate } from "react-router";


export const ItemPesquisa = ({ pessoa }) => {
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
        return <Navigate to={`/perfil/${pessoa.id}`}  />;

    return (
        <ListItem disablePadding
            secondaryAction={
              <IconButton edge="end" aria-label="delete">
                <PersonAddIcon />
              </IconButton>
            }>
            <ListItemButton role={undefined} dense onClick={() => setRedirect(true)}>
                <ListItemAvatar>
                        <Avatar {...stringAvatar(`${pessoa.nome}`)} sx={{ fontWeight: "initial" }} />
                </ListItemAvatar>
              <ListItemText primary={pessoa.nome} />
            </ListItemButton>
        </ListItem>
    )
}