import React from 'react';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
const styles = theme =>({
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
})
class ColorButton extends Button{
    
    constructor(props){
        super(props);
    }
};
ColorButton.propTypes = {
    classes: PropTypes.any.isRequired,
};
export default withStyles(styles)(ColorButton);