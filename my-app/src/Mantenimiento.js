import React from 'react';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Slider from '@material-ui/core/Slider';
const useStyles = makeStyles({
  root: {
    height: 300,
  },
});

function valuetext(value) {
  return `${value}°C`;
}
export default function Mantenimiento() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="lg">
      <Grid
  container
  direction="row"
  justify="space-between"
  alignItems="center"
>

<Grid item xs={4} sm={2}>
<Typography component="h1">
          Temperatura
        </Typography>
        <div className={classes.root}>
        <Slider
          orientation="vertical"
          getAriaValueText={valuetext}
          defaultValue={30}
          aria-labelledby="vertical-slider"
        />
                <Slider
          orientation="vertical"
          getAriaValueText={valuetext}
          defaultValue={30}
          aria-labelledby="vertical-slider"
        />
      </div>
</Grid>
  <Grid item xs={4} sm={2}>
<Typography component="h1">
          Humedad
        </Typography>
</Grid>
<Grid item xs={4} sm={2}>
<Typography component="h1">
          Nivel de Ph
        </Typography>
</Grid>
<Grid item xs={4} sm={2}>
<Typography component="h1">
          EC
        </Typography>
</Grid>
<Grid item xs={4} sm={2}>
<Typography component="h1">
          Luminosidad
        </Typography> 
</Grid>
</Grid>
    </Container>
  );
}
