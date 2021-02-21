import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
    card: {
        width: '100%',
        minHeight: 200,
        margin: '0 auto',
        marginBottom: '20px',
        paddingTop: '10px',
        [theme.breakpoints.up('md')]: {
            width: '80%'
        },
        cursor: 'pointer'
    },
    img: {
        display: 'block',
        margin: '0 auto',
    },
    caption: {
        fontWeight: '600',
        textAlign: 'center'
    },
    subtitle: {
        fontWeight: '600',
    },
    groupTypeChip: {
        "& > *": {
            marginRight: '5px',
            marginBottom: '5px'
        }
    },
    marginTop: {
        marginTop: '10px'
    }
}));