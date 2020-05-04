import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {BaseURL,signIn} from "../BaseURL";
import Auth from '../authentication-component/Authentication';
import $ from "jquery"
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
function IniciarSesionOnClick(props){
  var username=document.getElementById('email').value;
  var password=document.getElementById('password').value;
  var datos={
    "username": username,
    "password": password
  }
  datos=JSON.stringify(datos);
  $.ajax({
    url: BaseURL+signIn,
    method:"POST",
    data: datos,
    dataType:'JSON',
    success: function(respuesta){
      if(respuesta.result=="ok"){
        Auth.login(()=>{
          props.history.push('/monitoreo');
        });
      }
    }
 });
}
const SignIn= React.memo(function(props) {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Iniciar Sesión
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={()=>IniciarSesionOnClick(props)}
            className={classes.submit}
          >
            Iniciar Sesión
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link href="SignUp" variant="body2">
                {"¿Aun no tienes una cuenta? Registrate"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
);
export default SignIn;