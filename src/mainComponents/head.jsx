import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import reducer from '../reducer';
import { UPDATE_USER, UPDATE_USER_PASSWORD } from '../services/user/mutation';
import { UserContext } from '../App';
import { Card, CardActions, CardContent, Grid, Modal, TextField } from '@mui/material';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

export const Head = () => {
    const {usuarioAtual, setUsuarioAtual} = React.useContext(UserContext);
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [atualizarDados] = useMutation(UPDATE_USER);
    const [atualizarDadosSenha] = useMutation(UPDATE_USER_PASSWORD);
    const navigate = useNavigate();


    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    function handleDeslogar() {
      setUsuarioAtual(undefined);
      navigate('/login');
      handleCloseUserMenu();
    }

    const [nome, setNome] = React.useState("");
    const [username, setUsename] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [senha, setSenha] = React.useState("");
    const [state, dispatch] = React.useReducer(reducer, { usuario: usuarioAtual });

    function handleOpenModal(){
      setUsename(usuarioAtual.username);
      setNome(usuarioAtual.name);
      setEmail(usuarioAtual.email);
      setOpen(true);
    }

    function handleAtualizaDados(){
      if(senha.length <= 0){
        atualizarDados({ variables: { username, name: nome, email, id: usuarioAtual.id } })
        .then(retorno => {
           const { id, name, username, email } = retorno.data.update_user.returning[0];
           dispatch({ type: "UPDATE_USER", payload: { id, name, username, email } });
           setUsuarioAtual(state.usuario);
           setSenha("");
        });
      }
      else {
        atualizarDadosSenha({ variables: { username, name: nome, email, password: btoa(senha), id: usuarioAtual.id } })
        .then(retorno => {
           const { id, name, username, email } = retorno.data.update_user.returning[0];
           dispatch({ type: "UPDATE_USER", payload: { id, name, username, email } });
           setUsuarioAtual(state.usuario);
           setSenha("");
        });
      }
    }

    return (
      <>
      {
        usuarioAtual !== undefined &&
        <Modal open={open} onClose={() => setOpen(false)} >
        <Box component="div" sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', minWidth: '300px'}}>
          <Card>
              <CardContent>
                      <Typography variant='h4' sx={{ textAlign: 'center' }} pb={2}>
                          Dados da Conta
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
                  <Button fullWidth variant="contained" color='error' onClick={() => setOpen(false)}>Fechar</Button>
                  <Button fullWidth variant="contained" onClick={handleAtualizaDados}>Gravar</Button>
              </CardActions>
          </Card>
        </Box>
        </Modal>
      }
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography variant="h6" noWrap component="a" href="/" 
                sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem',color: 'inherit', textDecoration: 'none' }}>
                LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
                <MenuIcon />
              </IconButton>
              <Menu id="menu-appbar" anchorEl={anchorElNav} anchorOrigin={{vertical: 'bottom', horizontal: 'left',}} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'left',}} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu}
                sx={{display: { xs: 'block', md: 'none' },}}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">HOME</Typography>
                  </MenuItem>
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography variant="h5" noWrap component="a" href="" sx={{ mr: 2, display: { xs: 'flex', md: 'none' }, flexGrow: 1, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none',}}>
              Nivensseger
            </Typography>
            {
              usuarioAtual !== undefined &&
              <>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                  <Button onClick={() => {handleCloseNavMenu(); navigate('/conversas')}} sx={{ my: 2, color: 'white', display: 'block' }}>
                    HOME
                  </Button>
                  <Button onClick={() => {handleCloseNavMenu(); navigate('/pessoas')}} sx={{ my: 2, color: 'white', display: 'block' }}>
                    PESSOAS
                  </Button>
              </Box>
              <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar />
                </IconButton>
              </Tooltip>
              <Menu sx={{ mt: '45px' }} id="menu-appbar" anchorEl={anchorElUser} anchorOrigin={{ vertical: 'top', horizontal: 'right', }} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right',}} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>
                  <MenuItem onClick={handleOpenModal}>
                    <Typography textAlign="center">Account</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleDeslogar}>
                    <Typography textAlign="center">Sair</Typography>
                  </MenuItem>
              </Menu>
              </Box>
              </>
            }
          </Toolbar>
        </Container>
    </AppBar>
    </>
  );
}