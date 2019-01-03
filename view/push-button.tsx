import * as React from 'react'

export const PushButton = createComponent( "#push-button" );
export const SquareButton = createComponent( '#square-button' );
export const Text = createManipulator( '#text' );
export const Image = createManipulator( '#image' );
export const Stroke = createManipulator( '#stroke' );

export const ComboButton = ({ position, children, ...props } : any ) => (
    <use href={'#combo-button-' + position } {...props} >
        { children }
    </use>
)

export const ComboButtonIcon : React.FunctionComponent = createManipulator( '#combo-button-icon' );
export const ComboButtonIconPress = createManipulator( '#combo-button-icon-press' );
export const ComboButtonStroke = createManipulator( '#combo-button-stroke' );

function createComponent( ref ){
    return ({ children, ...props } : any ) => (
        <use href={ref} {...props} >
            { children }
        </use>
    )
}

function createManipulator( ref : string ) : React.FunctionComponent {
    return ({ children, ...props } : any ) => {
        const tags = [];
    
        children && tags.push( <set href={ref} attributeName="text-buffer" to={children} />);
    
        for( let name in props ){
            tags.push( <set href={ref} attributeName={name} to={props[name]} />);
        }
    
        return tags as any;
    }
}