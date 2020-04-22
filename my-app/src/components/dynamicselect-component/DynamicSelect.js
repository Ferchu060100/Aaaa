import React, {Component} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
})); 
  export default function DynamicSelect(props) {
    

    
        const classes = useStyles()
        
        let arrayOfData = props.arrayOfData;
        let options = arrayOfData.map((data) =>
                <MenuItem 
                    key={data.id}
                    value={data.id}
                >
                    {data.name}
                </MenuItem>
            );

        return (
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
        )
    
}