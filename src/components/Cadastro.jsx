import React from 'react';
import { Card, CardActions, CardContent, Button, Typography, TextField, Grid, Box  } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../services/user/mutation';


export const Cadastro = () => {
    const [nome, setNome] = React.useState("");
    const [username, setUsename] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [senha, setSenha] = React.useState("");
    const {setUsuarioAtual } = React.useContext(UserContext);
    const navigate = useNavigate();

    const [cadastro] = useMutation(REGISTER_USER);

    
    function handleCadastrar() {
       cadastro({ variables: { username, password: btoa(senha), name: nome, email } })
       .then(retorno => {
           const { id, name, username, image, email } = retorno.data.insert_user.returning[0];
           setUsuarioAtual({ id, name, username, image, email });
           navigate('/conversas');
       })
    }

    return(
        <Box component='div' id='Teste' sx={{ py: 4 }}>
        <Card>
            <CardContent>
                    <Typography variant='h4' sx={{ textAlign: 'center' }} pb={2}>
                        Informe os campos abaixo para cadastrar sua conta. 💦
                    </Typography>
                    <Grid item xs={12} pb={2}>
                        <TextField id="txtNome" name='txtNome' label="Nome" variant="outlined" fullWidth value={nome} onChange={(e) => setNome(e.target.value)}/>
                    </Grid>
                    <Grid item xs={12} pb={2}>
                    <TextField id="txtUsername" name='txtUsername' label="Nome de Usuario" variant="outlined" fullWidth value={username} onChange={(e) => setUsename(e.target.value)}/>
                    </Grid>
                    <Grid item xs={12} pb={2}>
                        <TextField id="txtEmail" name='txtEmail' label="Email" variant="outlined" fullWidth value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="txtSenha" name='txtSenha' type='password' label="Senha" variant="outlined"  fullWidth value={senha} onChange={(e) => setSenha(e.target.value)}/>
                    </Grid>
            </CardContent>
            <CardActions>
                {/*<Button fullWidth variant="contained" color='secondary' >Entrar como Convidado</Button>*/}
                <Button fullWidth variant="contained" onClick={() => navigate('/login')}>Ir para Login</Button>
                <Button fullWidth variant="contained" onClick={handleCadastrar}>Cadastrar conta</Button>
            </CardActions>
        </Card>
        </Box>
    )
}