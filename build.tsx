import * as ReactDOMServer from 'react-dom/server'
import * as React from 'react'
import { writeFileSync } from 'fs'

import { widgets } from './view/tools'
import View from './view'

writeFileSync( './resources/index.gui', ReactDOMServer.renderToStaticMarkup( <View/> ) );
writeFileSync( './resources/widgets.gui', ReactDOMServer.renderToStaticMarkup( widgets() ) );