import { makeStyles, withStyles } from "@material-ui/core";
import MuiListItem from '@material-ui/core/ListItem';
import { DRAWER_SIZE } from "../../constants/default";


export const ListItem = withStyles((theme) => ({
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