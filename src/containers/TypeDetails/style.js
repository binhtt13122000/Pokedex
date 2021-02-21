import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '10px',
        margin: '0 auto',
        minHeight: 0,
        width: '100%',
        borderRadius: '10px',
        [theme.breakpoints.up('md')]: {
            width: '80%',
            minHeight: '250px',
        }
    },
    effectContainer: {
        marginTop: '20px'
    },
    img: {
        display: 'block',
        margin: '0 auto',
        cursor: 'pointer',
    },
    pointer: {
        cursor: 'pointer'
    },
    table: {
        width: '100%'
    },
    th: {
        paddingTop: '5px',
        paddingBottom: '5px',
        width: '30%',
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
        paddingTop: '5px',
        paddingBottom: '5px',
        width: '70%',
        borderWidth: '1px 0 0 0',
        borderStyle: 'solid',
        borderColor: '#f0f0f0',
        paddingLeft: '10px'
    },
}))
