
import * as React from 'react'

const defsContent = [];

export function defs( jsx ){
    defsContent.push( jsx );
}

export function widgets(){
    return (
        <svg>
            <defs>
                { defsContent }
            </defs>
        </svg>
    )
}

export const Screen = ({ children, ...props }) => (
    <svg display="none" { ...props }>
        { children }
    </svg>
)

export function repeat( n, fun : ( i : number ) => any ){
    return seq( 0, n - 1 ).map( fun );
}


export function seq( from : number, to : number, step : number = 1 ) : any[] {
    const res = [];

    for( let i = from; i <= to; i += step ){
        res.push( i );
    }

    return res;
}
