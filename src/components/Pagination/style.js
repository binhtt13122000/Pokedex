import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
    paginationStyle: {
        display: 'block',
        marginBottom: '20px',
        marginTop: '20px',
        margin: '0 auto',
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        }
    }
}))