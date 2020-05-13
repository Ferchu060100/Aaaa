import React from 'react';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import TabPanel from '../../shared/TabPanel'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link, useRouteMatch, Route, withRouter } from 'react-router-dom';
import Monitor from '../monitor-component/Monitor'
import Reporte from '../reporte-component/Reporte';
const styles = theme =>({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  root: {
    flexGrow: 1,
    backgroundColor: "#333433",
    height: "100%",
    width: "100%",
    position: "fixed"
  },
  appBarMonitor: {
    backgroundColor: "#91ab83",
    color: "black",
  },
  tabSelected: {
    backgroundColor: "#238c74",
  },
  
  imageCenter:{
    display:"block",
    margin:"auto",
    width: "60%",
    height: "100%",
  },
  graphMonitor: {
    marginTop: 100,
  },
  footerGridMonitor: {
    height: "100%",
    position: "relative"
  },
  footerGridItemMonitor:{
    marginTop: "80%",
    marginBottom: "auto"
  },
  switchButtonSendEmailMonitor: {
    color: "white"
  },
});
class Home extends React.Component{
  state = {
    tabMonitorValue: 0
  };
  constructor(props){
    super(props);
    this.handleChangeTabsMonitor = this.handleChangeTabsMonitor.bind(this);
  }
  a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    };
  }
  handleChangeTabsMonitor = (event, newValue) => {
    this.setState({tabMonitorValue: newValue})
  };
  
  render(){

    const { classes} = this.props;
    return(
        <Box className={classes.root}>
            <AppBar className={classes.appBarMonitor} position="static" >
                <Tabs  value={this.state.tabMonitorValue}  onChange={this.handleChangeTabsMonitor} classes={{indicator: classes.tabSelected}} aria-label="simple tabs">
                    <Tab component={Link} to="/home/monitor" label="Monitoreo del Sistema" {...this.a11yProps(0)} />
                    <Tab component={Link} to="/home/reportes"  label="Reportes" {...this.a11yProps(1)} />
                        {/*<Tab component={Link} to="/"  label="Mantenimiento" {...this.a11yProps(2)} /> */}
                </Tabs>
            </AppBar>
                <TabPanel value={this.state.tabMonitorValue} active="/monitor" index={0}>
                    <Monitor />
                </TabPanel>
                <TabPanel value={this.state.tabMonitorValue} active="/reportes" index={1}>
                    <Reporte />
                </TabPanel>
        </Box>
        
    );
  }
}
Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
