import React from 'react';
import Aux from '../../HOC/Wrapper'
const layout = (props) => {
    return (
        <Aux>
            <div>Header</div>
            <main>
                {props.children}
            </main>
        </Aux>
    )
}

export default layout;