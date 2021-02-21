import React from 'react';
import { InputBase, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useStyles } from './style';
import { Autocomplete } from '@material-ui/lab';

export const CustomTextField = (props) => {
    const { type, className } = props;
    const classes = useStyles();

    //component
    let input = null;
    switch (type) {
        case 'autocomplete':
            input = (
                <Autocomplete
                    {...props}
                    getOptionLabel={option => option}
                    id="combo-box-demo"
                    options={props.options || []}
                    renderInput={(params) => <TextField {...props} {...params} variant="outlined" />}
                />
            )
            break;
        case 'resize':
            input = (
                <div className={`${classes.search} ${className}`}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        {...props}
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </div>
            );
            break;
        case 'date':
            break;
        default:
            input = <TextField {...props} className={className} />
            break;
    }

    //render
    return input;
}