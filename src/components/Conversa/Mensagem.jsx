import { Grid, Chip, Box } from "@mui/material";
import { UserContext } from '../../App';
import React from "react";

export const Mensagem = ({ mensagem }) => {
    const {usuarioAtual} = React.useContext(UserContext);

    return(
        <Grid item xs={12} sx={{ p: 0.5, px: 1, display: 'flex', justifyContent: usuarioAtual.id === mensagem.userId ? 'end' : 'start' }}>
              <Chip sx={{ p: 1 , height: 'auto', }} label={
                  <>
                    <Box component='div'>
                        <span style={{fontWeight: 'bold'}}>{mensagem.user.name} - {mensagem.dataEnvio}</span>
                    </Box>
                    <Box component='div' sx={{ mt: 1 }}>
                        <span style={{fontSize: '16px'}}>{mensagem.message}</span>
                    </Box>
                  </>
               } color="primary" />
            
        </Grid>
    );
}