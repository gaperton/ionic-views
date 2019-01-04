import * as React from 'react'
import { defs } from './tools'
import Screen1 from './screen1'
import Screen2 from './screen2'

defs( <link rel="stylesheet" href="styles.css" /> );
defs( <link rel="import" href="/mnt/sysassets/widgets_common.gui" /> );

export default () =>
    <svg>
        <Screen1/>
        <Screen2/>
    </svg>