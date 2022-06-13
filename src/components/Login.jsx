import React from 'react';
import { Card, CardActions, CardContent, Button, Typography, TextField, Grid, Box  } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import { GET_USER } from '../services/user/query';
import { useLazyQuery } from '@apollo/client';

export const Login = () => {
    const [email, setEmail] = React.useState("");
    const [senha, setSenha] = React.useState("");
    const {setUsuarioAtual } = React.useContext(UserContext);
    const [loadLogin] = useLazyQuery(GET_USER);
    const navigate = useNavigate();

    function handleLogar() {
        loadLogin({ variables: { email } })
            .then((lazy) => {
                const user = lazy.data.user[0]
                if (user.password === btoa(senha)) {
                    const { username, name, id, image } = user
                    setUsuarioAtual({ id, name, username, image, email });
                    navigate('/conversas');
                }
                else{
                    alert("Senha incorreta");
                }
            })
    }

    return(
        <Box component='div' id='Teste' sx={{ py: 4 }}>
        <Card >
            <CardContent>
                    <Typography variant='h4' sx={{ textAlign: 'center' }} pb={2}>
                        Bem-vindo ao Nivensseger, onde as conversas são livres e privadas! 😎
                    </Typography>
                    <Grid item xs={12} pb={2}>
                        <TextField id="txtEmail" name='txtEmail' label="Email" variant="outlined" fullWidth value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="txtSenha" name='txtSenha' type='password' label="Senha" variant="outlined"  fullWidth value={senha} onChange={(e) => setSenha(e.target.value)}/>
                    </Grid>
            </CardContent>
            <CardActions>
                <Button fullWidth variant="contained" color='error' onClick={() => navigate('/cadastro')}>Cadastrar Conta</Button>
                <Button fullWidth variant="contained" color='primary' onClick={handleLogar} >Entrar</Button>
            </CardActions>
        </Card>
        </Box>
    );
}