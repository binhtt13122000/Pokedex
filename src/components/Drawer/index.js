import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { useStyles } from './style';
import { useTheme } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Logo from '../../assets/logo.png';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import PokeBall from '../../assets/pokeball.svg';
import NintendoSwitch from '../../assets/nintendo-switch.svg';
import Trainer from '../../assets/trainer.svg';
import { useHistory } from 'react-router';

const drawerItems = [
    {
        id: 1,
        text: "Pokedex",
        icon: <img src={PokeBall} alt="pokedex" width="30px" height="30px" />,
        to: '/',
        children: [
            {
                id: "Kanto",
                text: "Kanto",
                icon: <NotificationsActiveIcon />,
                to: '/kanto/pokedex',
            },
            {
                id: "Johto",
                text: "Johto",
                icon: <NotificationsActiveIcon />,
                to: '/johto/pokedex',
            }
        ]
    },
    {
        id: 2,
        text: "Abilities",
        icon: <img src={Trainer} alt="pokedex" width="30px" height="30px" />,
        to: '/abilities'
    },
    {
        id: 3,
        text: "Types",
        icon: <NotificationsActiveIcon />,
        to: '/types'
    },
    {
        id: 4,
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

export const DrawerComponent = (props) => {
    const [selectedIndex, setSelectedIndex] = useState(1);
    const history = useHistory();
    const handleListItemClick = (event, index, path) => {
        setSelectedIndex(index);
        if(path){
            history.push(path)
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
            <Divider />
            <List>
                {drawerItems.map((item, index) => (
                    <ListItem button key={index} onClick={e => handleListItemClick(e, item.id, item.to)} selected={selectedIndex === item.id}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
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



