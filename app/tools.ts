interface TreeNode {
    child? : TreeNode
    sibling? : TreeNode
}

function traverse( tree : TreeNode, method : string, ctx? : object ){
    for( let node = tree.child; node; node = node.sibling ){
        traverse( node, method );
        node[ method ]( ctx );
    }

    tree[ method ]( ctx );
}

export class View implements TreeNode {
    child : View;
    next : View;

    insert( subview ){
        subview.next = this.children;
        this.children = subview;
        if( subview.el ) subview.el.style.display = 'inline';
    }

    remove( subview ){
        if( subview.el ) subview.el.style.display = 'none';

        for( let child = this.child; child; child = child.next ){
            if( child === subview )
        }
    }

    constructor(){

    }

    render(){
        traverse( this, 'render' )
    }

    dispose(){
        for( let child = this.children; child; child = child.next ){
            child.dispose();
        }
    }
}

export class Application {
    get screen(){ return this._screen };
    set screen( x : Screen ){
        
    }
}

// Global update queue?