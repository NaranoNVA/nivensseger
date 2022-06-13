import React from "react";
import { Box, Avatar, Typography, List,
    Card, CardContent, CardHeader, TextField, IconButton, Grid, } from "@mui/material";
import GroupIcon from '@mui/icons-material/Group';
import { ItemPesquisa } from "./ItemPesquisa";
import { useLazyQuery } from "@apollo/client";
import { GET_USERS } from "../../services/user/query";
import SearchIcon from '@mui/icons-material/Search';
import { UserContext } from '../../App';


export const Pesquisa = () => {
    const [nome, setNome] = React.useState("");
    const [carregarPessoas] = useLazyQuery(GET_USERS);
    const [pessoas, setPessoas] = React.useState([]);
    const { usuarioAtual } = React.useContext(UserContext);

    function handlePesquisar(){
        carregarPessoas({variables: { name: nome }})
        .then((lazy) => {
            setPessoas(lazy.data.user.filter(p => p.id !== usuarioAtual.id))
        });
    }

    return(
        <Box sx={{ py: 4 }}>
        <Card>
            <CardHeader sx={{ bgcolor : 'primary.dark' }} avatar={
                <>
                    <Avatar><GroupIcon></GroupIcon></Avatar>
                </>
                } title={
                    <Grid item xs={12} sx={{display: 'flex'}}>
                        <TextField label="Nome" variant="outlined" sx={{ maxHeight: "120px" }} color="primary" maxRows={4} fullWidth multiline value={nome} onChange={(e) => setNome(e.target.value)}/>
                        <IconButton sx={{ mx: 1 }} onClick={handlePesquisar}>
                            <SearchIcon sx={{ color: 'action.active'}} />
                        </IconButton>
                    </Grid>
                }>   
            </CardHeader>
            <CardContent sx={{ p: 0 }}>
                <Box sx={{ minHeight: '68vh', maxHeight: '68vh', overflowY: 'scroll', overflowX: 'hidden' }}>
                    <List component="nav" sx={{ pr: 1 }}>
                        {
                            pessoas.map((pessoa, index) => {
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