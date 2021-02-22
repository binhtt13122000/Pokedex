import Axios from "axios";
import React, { useEffect, useState } from "react";
import { NotFound } from '../containers/NotFound';

const checkFetchApi = (Wrapper) => {
    const CheckRequestComponent = (props) => {
        const [error, setError] = useState(false);

        useEffect(() => {
            Axios.interceptors.response.use(
                function (response) {
                    return response;
                },
                function (error) {
                    if (error.response.status !== 200) {
                        setError(true);
                    }
                    return Promise.reject(error);
                }
            )
        }, []);

        if(error){
            return <NotFound />
        } else {
            return <Wrapper {...props} />
        }
    }

    return CheckRequestComponent;
}

export default checkFetchApi