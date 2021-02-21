import React, { useState } from 'react';
import { useStyles } from './style';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from 'react-router';
import Logo from '../../assets/logo.png';
import { CustomTextField } from '../TextField';
import { useMediaQuery, useTheme } from '@material-ui/core';
import { convertNormalStringToHyphenString } from '../../utils/function';

export const Header = (props) => {
    //variable
    const classes = useStyles();
    const history = useHistory();
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

    //state
    const [search, setSearch] = useState("");

    //function
    const submitHadler = (e) => {
        history.push("/pokemon/" + convertNormalStringToHyphenString(search));
    }
    //render
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

                {isDesktop ? <img src={Logo} alt="logo" width="100px" height="auto" className={classes.logo} onClick={props.goHomePage}/> : null}                
                <div className={classes.flexGrowInput} />
                {isDesktop ? <form onSubmit={submitHadler}>
                    <CustomTextField onChange={e => setSearch(e.target.value)} value={search} placeholder="Search Poke..." type="resize" className={classes.searchBar} />
                </form> : <img src={Logo} alt="logo" width="100px" height="auto" className={classes.logo} onClick={props.goHomePage} />}
                
            </Toolbar>
        </AppBar>
    );
}
