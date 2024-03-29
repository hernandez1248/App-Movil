import * as React from 'react';
import { Button, Container, Chip, Alert,Grid, Input, InputLabel, Paper, TextField, Typography } from "@mui/material";
import { fontSize, margin, maxWidth } from "@mui/system";
import Box from '@mui/material/Box';
import Head from "next/head";
import Link from "next/link";
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getProviders, getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ErrorOutline } from '@mui/icons-material';

    const  Login = () => {
    const [showPwd, setShowPwd] = useState(false)
    const router = useRouter();
    const { query } = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [ showError, setShowError ] = useState(false);
    const [providers, setProviders] = useState({});
  
    useEffect(() => {
      getProviders().then( prov => {
        setProviders(prov)
      });
    
      if (router.query.error && router.query.error === 'CredentialsSignin') {
        setShowError(true);
      }
    }, []);
  
    const onLoginUser = async( { email, password }) => {
  
      setShowError(false);
  
      await signIn('credentials',{ email, password });
    }

    return (
        <>
          <Head>
            <title>Login</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
          </Head>

            <Container>
              <div style={{display: 'flex', justifyContent: 'center'}}>
                    <div style={{marginTop: "60px", height: "130px", width: "130px", borderRadius: '50%', backgroundColor: '#1976d2'}}>
                        <DirectionsBusIcon style={{fontSize: '100px', color: 'white', fontWeight: 'bold', marginTop: '18px', marginLeft: '16px'}}>
                        </DirectionsBusIcon>
                    </div>
                </div>
                <Grid item xs={12} md={8} >
                  <Typography variant="h4"mt={6} sx={{textAlign: 'center', fontWeight: "bold", }}>
                      ¡Bienvenido!
                  </Typography>
                </Grid>
                <Box component="form" onSubmit={ handleSubmit(onLoginUser) } noValidate>
                    <Grid container spacing={4} sx={{display: 'flex', justifyContent: 'center', marginBottom: 4}}>
                        <Grid item xs={12} md={8} sx={{ my: 3}}>
                            <Chip 
                                label="La credencial ingresada es incorrecta."
                                color="error"
                                icon={ <ErrorOutline /> }
                                className="fadeIn"
                                sx={{ display: showError ? 'flex': 'none' }}
                            />
                            {(query.error && query.error !== 'CredentialsSignin')&& (
                              <Alert severity="error">{query.error}</Alert>
                            )}
                          <Typography color="primary" variant="h5" mt={6}  sx={{fontWeight: "bold"}}>
                              Correo electrónico
                          </Typography>
                          <TextField
                            variant="standard"
                            id="input-with-icon-textfield"
                            fullWidth
                            required
                            autoFocus
                            { ...register('email', {
                              required: 'Este campo es requerido',
                            })}
                            error={ !!errors.email}
                            helperText={ errors.email?.message }
                          />
                          
                        </Grid>
                        <Grid item xs={12} md={8}>
                        <Typography color="primary" variant="h5" sx={{fontWeight: "bold"}}>
                            Contraseña
                        </Typography>
                        <TextField 
                            variant="standard"
                            type={showPwd ? "text": "password"}
                            fullWidth
                            { ...register('password', {
                              required: 'Este campo es requerido',
                            })}
                            error={ !!errors.password }
                            helperText={ errors.password?.message }
                        />
                        <div onClick={() => setShowPwd (!showPwd)}>
                            {showPwd ? <VisibilityIcon className="eyeFill"></VisibilityIcon> :
                                <VisibilityOffIcon className="eyeFill"></VisibilityOffIcon>
                            }
                        </div>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Button 
                        fullWidth 
                        sx={{fontSize: "20px"}} 
                        type="submit" 
                        variant="contained"
                        disabled={Object.keys(errors).length > 0}
                        >
                          Ingresar
                      </Button>
                        <Typography variant="h6" mt={4} sx={{textAlign: 'center', fontWeight: "bold"}}>
                            ¿Olvidaste tu contraseña? <Link style={{textDecoration: 'underline', color: '#1976d2'}} href="restore">Ingresa aquí</Link>
                        </Typography>
                    </Grid>
                </Box>
               
            </Container>
        </>
    );
};

// si logra ser autenticado, regresarlo a la página que intentó acceder
export const getServerSideProps = async ({ req, query }) => {
    const session = await getSession({ req });
  
    const { p = 'rutas-admin' } = query;
  
    if ( session ) {
      return {
        redirect: {
          destination: p.toString(),
          permanent: false
        }
      }
    }
  
    return {
      props: { }
    }
  }

  export default Login;