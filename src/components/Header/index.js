import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import { useStyles } from './style';
import Logo from '../../assets/logo.png';
export const Header = (props) => {
    const classes = useStyles();
    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={props.handleDrawerToggle}
                    className={classes.menuButton}
                >
                    <MenuIcon />
                </IconButton>
                <div className={classes.flexGrow}></div>
                <img src={Logo} alt="logo" width="100px" height="auto" className={classes.logo}/>
            </Toolbar>
        </AppBar>
    );
}
