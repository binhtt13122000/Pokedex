import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import { useStyles } from './style';
import Logo from '../../assets/logo.png';
import { CustomTextField } from '../TextField';
import { useHistory } from 'react-router';
export const Header = (props) => {
    const classes = useStyles();
    const [search, setSearch] = useState("");
    const history = useHistory();
    const submitHadler = (e) => {
        // e.preventDefault();
        history.push("/pokemon/" + search);
    }
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
