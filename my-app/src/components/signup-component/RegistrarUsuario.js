import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {BaseURL,signUp} from "../BaseURL"
import $ from 'jquery';
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
function PostUsuario(){
  var name=document.getElementById('firstName').value;
  var familyName=document.getElementById('lastName').value;
  var username=document.getElementById('email').value;
  var password=document.getElementById('password').value;
  var datos={
    "name": name,
    "family_name": familyName,
    "username": username,
    "password": password
  }
  datos=JSON.stringify(datos);
  $.ajax({
    url: BaseURL+signUp,
    method:"POST",
    data: datos,
    dataType:'JSON',
    success: function(respuesta){
      if(respuesta.result=="ok")
        window.location.href='/SignIn'
    }
 });
}
const SignUp=React.memo(function() {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Formulario de Registro
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Nombre"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Apellido"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Correo"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="Acepto los terminos de uso y las politicas de privacidad"
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={PostUsuario}
          >
            Registrar
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link href="iniciarsesion" variant="body2">
               ¿Ya tienes una cuenta?. Inicia Sesión
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
});
export default SignUp;