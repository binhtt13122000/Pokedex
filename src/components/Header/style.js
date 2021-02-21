import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
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
  flexGrowInput: {
    flexGrow: 1
  },
  searchBar: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  }
}));