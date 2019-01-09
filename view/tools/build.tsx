import * as ReactDOMServer from 'react-dom/server'
import * as React from 'react'
import { writeFileSync } from 'fs'

import { definitions } from '.'
import View from '../index'

writeFileSync(
    './resources/index.gui',
    ReactDOMServer.renderToStaticMarkup( <View/> )
);

writeFileSync( './resources/widgets.gui',
    ReactDOMServer.renderToStaticMarkup(
        <svg>
            <defs>
                { definitions }
            </defs>
        </svg>
    )
);