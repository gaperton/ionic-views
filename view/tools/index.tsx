
import * as React from 'react'

export const definitions = [];

// Add definition to widgets.gui
export function defs( jsx ){
    definitions.push( jsx );
}

defs( <link rel="stylesheet" href="styles.css" /> );
defs( <link rel="import" href="/mnt/sysassets/widgets_common.gui" /> );

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
