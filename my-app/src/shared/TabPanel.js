import React from 'react';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
const styles = theme =>({

})
class TabPanel extends React.Component{
    
    constructor(props){
        super(props);
    }
    
    render() {
        const { children, value ,index, ...other } = this.props;
        
        return(
            <Typography
                component="div"
                hidden={value !== index}
                role="tabpanel"
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value}
                {index}
                {value === index && (
                    <Box p={3}>
                    {children}
                    </Box>
                )}
            </Typography>
        );
    }
};
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
    active: PropTypes.any.isRequired,
  };
export default withStyles(styles)(TabPanel);