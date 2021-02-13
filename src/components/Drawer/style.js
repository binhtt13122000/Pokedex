import { makeStyles } from "@material-ui/core";
import { DRAWER_SIZE } from "../../constants/default";


export const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: DRAWER_SIZE,
      flexShrink: 0,
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: DRAWER_SIZE,
  },
  logo: {
    display: 'block',
    margin: '0 auto',
    marginTop: '20px',
    marginBottom: '20px'
  }
}));