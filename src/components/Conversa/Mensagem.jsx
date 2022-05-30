import { Card, CardContent, Grid, Chip } from "@mui/material";
import React from "react";

export const Mensagem = ({ mensagem }) => {
    return(
        <Grid item xs={12} sx={{ py: 0.5 }}>
              <Chip sx={{ p: 1 , height: 'auto' }} label={
                  <>
                    <div>
                        <span>{mensagem.nomeUsuario} - {mensagem.data} as {mensagem.hora}</span>
                    </div>
                    <div>
                        <span>{mensagem.mensagem}</span>
                    </div>
                  </>
               } color="primary" />
            
        </Grid>
    );
}