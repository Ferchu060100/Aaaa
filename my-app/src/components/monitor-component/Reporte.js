import React from 'react';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {  getSelectSensorData } from '../../index';
import { Button, withStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
const ColorButton = withStyles((theme) => ({
    root: {
      margin: "10px",
      backgroundColor: "#238c74",
      color: "black",
      borderColor: "black",
      fontSize: 12,
      minWidth: "90px",
      minHeight: "54px",
      maxWidth: "118px",
      maxHeight: "54px",
      '&:hover':{
        backgroundColor: "#50C750",
      }
    },
  }))(Button);
  const styles = theme => ({
    footerGridMonitor: {
        height: "100%",
        position: "relative"
      },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
})
class Reporte extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
            arraySensor: []
        };
        this.loadSensorInfo = this.loadSensorInfo.bind(this);
      }

    loadSensorInfo (){
        getSelectSensorData().then(
            function(result){
                console.log(result)
              this.setState({
                  arraySensor: result,
                });
            }
        )
    }
    componentDidMount(){
        this.loadSensorInfo.bind(this)
    }
    
    render(){
        const {classes} = this.props;
        
        let options = this.state.arraySensor.map((data) =>
        <MenuItem 
            key={data.id}
            value={data.id}
        >
            {data.name}
        </MenuItem>
        );
        return(
            <div>
                <Grid container spacing={3}>
                <Grid item xs={3}>
                <FormControl  className={classes.formControl}>
                                <InputLabel id="demo-simple-select-helper-label">Sensores</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                >
                                    <MenuItem value="">
                                    <em>None</em>
                                    </MenuItem>
                                    {options}
                                </Select>
                </FormControl>
                </Grid>
                <Grid item xs={9}></Grid>
            
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={9}>
                </Grid>
                <Grid item xs={3} className={classes.footerGridMonitor}>
                    
                <ColorButton ></ColorButton>
                </Grid>
            </Grid>
            </div>
        
          );
    }
}
export default withStyles(styles)(Reporte);