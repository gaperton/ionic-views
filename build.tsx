import * as ReactDOMServer from 'react-dom/server'
import { writeFileSync } from 'fs'

import * as React from 'react'
import View from './view'

writeFileSync( './tst.svg', ReactDOMServer.renderToStaticMarkup( <View /> ) );