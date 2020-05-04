import React, { Fragment } from 'react';

const PopUp = (data) => {
    console.log(data)
    return (
        <Fragment>
            {data.data.properties.ambasadorStatus === 1 ? 
            <>
                <h1>{data.data.properties.name}</h1> 
                <h2>{data.data.properties.ambasador}</h2> 
            </>
            : 
            <>
                <h1>State: {data.data.properties.NAME}</h1> 
                <a target="_blank" rel="noopener noreferrer" href={data.data.properties.url}>{data.data.properties.party}</a>
             </>
            }
        </Fragment>
    )
}

export default PopUp