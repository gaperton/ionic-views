declare module 'document' {
    export interface Document {
        getElementById(id: string): any;
        onkeypress : ( e : { key : 'down' | 'up' } ) => void
    }

    const document : Document;
    export default document;
}

declare module 'display' {
    export interface Display {
        on : boolean;
        poke() : void;

        onchange : () => void;
    }

    export const display : Display;
}