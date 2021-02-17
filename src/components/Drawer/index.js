import React, { useEffect, useLayoutEffect, useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import MuiListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useStyles } from './style';
import { useTheme, withStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Logo from '../../assets/logo.png';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import PokeBall from '../../assets/pokeball.svg';
import NintendoSwitch from '../../assets/nintendo-switch.svg';
import Trainer from '../../assets/trainer.svg';
import { useHistory } from 'react-router';
import { Fragment } from 'react';
import Axios from 'axios';
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { List, Collapse } from '@material-ui/core';
import { regions } from '../../assets/data';

const drawerItems = [
    {
        id: 1,
        text: "Pokedex",
        icon: <img src={PokeBall} alt="pokedex" width="30px" height="30px" />,
        to: '/',
    },
    {
        id: 2,
        text: "Regions",
        icon: <img src={PokeBall} alt="pokedex" width="30px" height="30px" />,
        children: [
            regions.map((item, index) => {
                return {
                    id: index + 5,
                    to: `/regions/${item.name}`,
                    text: item.name.charAt(0).toUpperCase() + item.name.substring(1) 
                }
            })
        ]
    },
    {
        id: 3,
        text: "Abilities",
        icon: <img src={Trainer} alt="pokedex" width="30px" height="30px" />,
        to: '/abilities'
    },
    {
        id: 4,
        text: "Types",
        icon: <NotificationsActiveIcon />,
        to: '/types'
    },
    {
        id: 5,
        text: "Games",
        icon: <img src={NintendoSwitch} alt="pokedex" width="30px" height="30px" />,
        to: '/games',
        children: [
            {
                id: "GenI",
                text: "Gen I",
                icon: <NotificationsActiveIcon />,
                to: '/generation1/pokedex',
            },
            {
                id: "GenII",
                text: "GenII",
                icon: <NotificationsActiveIcon />,
                to: '/generation2/pokedex',
            }
        ]
    },
]

const ListItem = withStyles((theme) => ({
    root: {
        "&$selected": {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white
        },
        "&$selected:hover": {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white
        },
        "&:hover": {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white
        }
    },
    selected: {},
}))(MuiListItem);

export const DrawerComponent = (props) => {

    const [selectedIndex, setSelectedIndex] = useState(parseInt(sessionStorage.getItem("item")) || 1);
    const [open, setOpen] = useState(false);

    const history = useHistory();

    useLayoutEffect(() => {
        const getRegions = async () => {
            try {
                const response = await Axios.get("https://pokeapi.co/api/v2/region");
                if (response.status === 200) {
                    const routers = response.data.results.map((item, index) => {
                        return {
                            id: (index + 1 + drawerItems.length),
                            text: item.name.charAt(0).toUpperCase() + item.name.substring(1) ,
                            to: `/regions/${item.name}`
                        }
                    })
                    drawerItems[1].children = routers;
                    console.log(drawerItems)
                }
            } catch (e) {
                console.log(e);
            }
        }
        getRegions();
    }, [])

    //function
    const handleListItemClick = (event, index, path, hasChildren, fatherIndex) => {
        sessionStorage.setItem("item", fatherIndex);
        setSelectedIndex(index);
        if (path) {
            history.push(path)
            setOpen(false)
            setSelectedIndex(fatherIndex)
        }
        if(hasChildren){
            setOpen(!open)
        }
    };
    //const
    const { mobileOpen, handleDrawerToggle, window } = props;
    const container = window !== undefined ? () => window().document.body : undefined;
    const classes = useStyles();
    const theme = useTheme();
    //reused component
    const drawer = (isMobile) => {
        return <div>
            {isMobile ? <img className={classes.logo} src={Logo} width="200px" height="auto" alt="logo" /> : <div className={classes.toolbar} />}
            {/* <Divider /> */}
            <Fragment>
                {drawerItems.map((item, index) => (
                    <Fragment key={index}>
                        <ListItem button onClick={e => handleListItemClick(e, item.id, item.to, item.children, item.id)} selected={selectedIndex === item.id}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                            {item.children ? (open ? <ExpandLess /> : <ExpandMore />) : null}
                        </ListItem>
                        {item.children ? <Collapse in={open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {item.children.map((itemChildren) => {
                                    return (<ListItem
                                        button
                                        className={classes.nested}
                                        selected={selectedIndex === itemChildren.id}
                                        onClick={e => handleListItemClick(e, itemChildren.id, itemChildren.to, itemChildren.children, item.id)}
                                        key={itemChildren.id}
                                    >
                                        <ListItemIcon>{itemChildren.icon}</ListItemIcon>
                                        <ListItemText primary={itemChildren.text} />
                                    </ListItem>)
                                })}
                            </List>
                        </Collapse> : null}
                    </Fragment>
                ))}
            </Fragment>
        </div>
    }

    //render
    return (
        <nav className={classes.drawer} aria-label="mailbox folders">
            <Hidden smUp implementation="css">
                <Drawer
                    container={container}
                    variant="temporary"
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true,
                    }}
                >
                    {drawer(theme.breakpoints.up('sm'))}
                </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
                <Drawer
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                    open
                >
                    {drawer(!theme.breakpoints.up('sm'))}
                </Drawer>
            </Hidden>
        </nav>
    )
}



