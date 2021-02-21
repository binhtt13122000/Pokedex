import React from 'react';
import { InputBase, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useStyles } from './style';
import { Autocomplete, createFilterOptions } from '@material-ui/lab';
import { convertHyPhenStringToNormalString } from '../../utils/function'

export const CustomTextField = (props) => {
    const { type, className } = props;
    const classes = useStyles();

    //component
    let input = null;
    switch (type) {
        case 'autocomplete':
            const filterOptions = createFilterOptions({
                limit: 5
            })
            input = (
                <Autocomplete
                    {...props}
                    getOptionLabel={option => convertHyPhenStringToNormalString(option)}
                    id="combo-box-demo"
                    filterOptions={filterOptions}
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