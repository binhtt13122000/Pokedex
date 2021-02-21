import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    paper: {
        paddingTop: '10px',
        width: '100%',
        margin: '0 auto',
        minHeight: '0px',
        [theme.breakpoints.up('md')]: {
            width: '80%',
            minHeight: '400px'
        }
    },
    table: {
        width: '100%'
    },
    th: {
        paddingTop: '5px',
        paddingBottom: '5px',
        width: '50%',
        color: '#737373',
        fontSize: '.875rem',
        fontWeight: 'normal',
        textAlign: 'right',
        borderWidth: '1px 0 0 0',
        borderStyle: 'solid',
        borderColor: '#f0f0f0',
        paddingRight: '10px'
    },
    td: {
        paddingTop: '2px',
        width: '50%',
        borderWidth: '1px 0 0 0',
        borderStyle: 'solid',
        borderColor: '#f0f0f0',
        paddingLeft: '10px'
    },
    img: {
        display: 'block',
        margin: '0 auto',
        cursor: 'pointer'
    }
}))