import React from 'react';
import NotFound from '../../assets/notfound.jpg';
export const Image = (props) => {
    return <img {...props} onError={(e) => { e.target.onerror = null; e.target.src = NotFound }} />
}