import React from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Card, CardActions, CardContent, Button, Typography, TextField, Grid  } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import { AdicionarUsuario } from '../services/userService';


export const Cadastro = () => {
    const [nome, setNome] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [senha, setSenha] = React.useState("");
    const { usuarioAtual, setUsuarioAtual } = React.useContext(UserContext);
    const navigate = useNavigate();
    const auth = getAuth();

    
    function handleCadastrar() {
        createUserWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
            setUsuarioAtual(userCredential.user);
            AdicionarUsuario(
                {
                    nome: nome,
                    email: email
                },
                usuarioAtual.uid
            ).then(obj => {
                navigate('/pessoas');
            }).catch((error) => console.log(error));
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
                        Informe os campos abaixo para cadastrar sua conta. 💦
                    </Typography>
                    <Grid item xs={12} pb={2}>
                        <TextField id="txtNome" name='txtNome' label="Nome" variant="outlined" fullWidth value={nome} onChange={(e) => setNome(e.target.value)}/>
                    </Grid>
                    <>
                        <Grid item xs={12} pb={2}>
                            <TextField id="txtEmail" name='txtEmail' label="Email" variant="outlined" fullWidth value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id="txtSenha" name='txtSenha' type='password' label="Senha" variant="outlined"  fullWidth value={senha} onChange={(e) => setSenha(e.target.value)}/>
                        </Grid>
                    </>
            </CardContent>
            <CardActions>
                {/*<Button fullWidth variant="contained" color='secondary' >Entrar como Convidado</Button>*/}
                <Button fullWidth variant="contained" onClick={() => navigate('/login')}>Fazer Login</Button>
                <Button fullWidth variant="contained" onClick={handleCadastrar}>Cadastrar conta</Button>
            </CardActions>
        </Card>
    )
}