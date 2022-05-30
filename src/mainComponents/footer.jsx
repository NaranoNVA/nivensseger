import { Box, Container } from "@mui/material"


export const Footer = () => {
    return (
        <Box component="footer" sx={{ backgroundColor: 'primary.main', width: "100%", position: "fixed", bottom: "0" }}>
            <Container component="span" sx={{ textAlign: "center" }}>
                <span>Teste</span>
            </Container>
        </Box>
    )
}