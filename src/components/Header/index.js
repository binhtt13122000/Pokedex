import React, { useState } from 'react';

import { useStyles } from './style';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { useHistory } from 'react-router';

import Logo from '../../assets/logo.png';
import { CustomTextField } from '../TextField';

export const Header = (props) => {
    //variable
    const classes = useStyles();
    const history = useHistory();

    //state
    const [search, setSearch] = useState("");

    //function
    const submitHadler = (e) => {
        history.push("/pokemon/" + search);
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
                <div className={classes.flexGrow} />
                <img src={Logo} alt="logo" width="100px" height="auto" className={classes.logo} />
                <div className={classes.flexGrowInput} />
                <form onSubmit={submitHadler}>
                    <CustomTextField onChange={e => setSearch(e.target.value)} value={search} placeholder="Search Poke..." type="resize" className={classes.searchBar} />
                </form>
            </Toolbar>
        </AppBar>
    );
}
