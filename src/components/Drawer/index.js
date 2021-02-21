import React, { useLayoutEffect, useState, Fragment, useContext } from 'react';
import { ListItem, useStyles } from './style';
import { useTheme, List, Collapse, Drawer, ListItemIcon, ListItemText, Hidden } from '@material-ui/core';
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Logo from '../../assets/logo.png';
import { useHistory } from 'react-router';
import { drawerItems } from './data';
import { CustomTextField } from '../TextField';
import { StoreContext } from '../../utils/context';

export const DrawerComponent = (props) => {
    //state
    const [selectedIndex, setSelectedIndex] = useState(parseInt(sessionStorage.getItem("item")) || 1);
    const [openChildren, setOpenChildren] = useState(false);
    const [search, setSearch] = useState("");

    //variable
    const history = useHistory();
    const { pokeStore} = useContext(StoreContext);
    const { mobileOpen, handleDrawerToggle, window } = props;
    const container = window !== undefined ? () => window().document.body : undefined;
    const classes = useStyles();
    const theme = useTheme();

    //useEffect
    useLayoutEffect(() => {
        const getRegions = () => {
            const routers = props.regions.map((item, index) => {
                return {
                    ...item, 
                    id: (index + 1 + drawerItems.length),
                }
            })
            drawerItems[1].children = routers;
        }
        getRegions();
    }, [props.regions])

    //function
    const handleListItemClick = (event, index, path, hasChildren, fatherIndex) => {
        sessionStorage.setItem("item", fatherIndex);
        setSelectedIndex(index);
        if (path) {
            history.push(path)
            setOpenChildren(false)
            setSelectedIndex(fatherIndex)
        }
        if (hasChildren) {
            setOpenChildren(!openChildren)
        }
    };

    //reused component
    const mobileHeaderDrawer = (
        <Fragment>
            <img className={classes.logo} src={Logo} width="200px" height="auto" alt="logo" />
            <form onSubmit={e => history.push("/pokemon/" + search)}>
                <CustomTextField 
                    type="autocomplete"
                    options={pokeStore.pokeNames || []}
                    placeholder="Search Poke..." 
                    variant="outlined" 
                    size="small" 
                    fullWidth color="primary"
                    // value={search} 
                    // onChange={e => setSearch(e.target.value)} 
                    />
            </form>
        </Fragment>
    )

    const listDrawerItem = (
        <Fragment>
            {drawerItems.map((item, index) => (
                <Fragment key={index}>
                    <ListItem button onClick={e => handleListItemClick(e, item.id, item.to, item.children, item.id)} selected={selectedIndex === item.id}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                        {item.children ? (openChildren ? <ExpandLess /> : <ExpandMore />) : null}
                    </ListItem>
                    {item.children ? <Collapse in={openChildren} timeout="auto" unmountOnExit>
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
    )
    const drawer = (isMobile) => {
        return <div>
            {isMobile ? mobileHeaderDrawer : <div className={classes.toolbar} />}
            {listDrawerItem}
        </div>
    }

    //render
    return (
        <nav className={classes.drawer} aria-label="mailbox folders">
            <Hidden mdUp implementation="css">
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
            <Hidden smDown implementation="css">
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



