import React from 'react';
import { getAuth, signInWithEmailAndPassword  } from "firebase/auth";
import { Card, CardActions, CardContent, Button, Typography, TextField, Grid  } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

export const Login = () => {
    const [email, setEmail] = React.useState("");
    const [senha, setSenha] = React.useState("");
    const { usuarioAtual, setUsuarioAtual } = React.useContext(UserContext);
    const navigate = useNavigate();
    const auth = getAuth();
    console.log(getAuth());


    function handleLogar() {
        signInWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
            setUsuarioAtual(userCredential.user);
            navigate('/pessoas');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }

    return(
        <Card sx={{ my: 4 }}>
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
    );
}