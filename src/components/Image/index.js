import React from 'react';
import NotFound from '../../assets/notfound.jpg';
export const Image = (props) => {
    return <img {...props} src={props.src} onError={(e) => { e.target.onerror = null; e.target.src = NotFound }} alt={props.alt}/>
}