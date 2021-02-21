import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  appBar: {
      zIndex: (theme.zIndex.drawer + 1) + " !important"
      // width: `calc(100% - ${drawerWidth}px)`,
      // marginLeft: drawerWidth,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none !important',
    },
  },
  logo: {
    display: 'block',
    cursor: 'pointer',
  },
  flexGrow: {
    [theme.breakpoints.down('md')]: {
      flexGrow: 1
    }
  },
  flexGrowInput: {
    [theme.breakpoints.up('md')]: {
      flexGrow: 1
    }
  },
  searchBar: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  }
}));