import * as React from 'react'
import { Screen, repeat } from './tools'

export default () =>
    <Screen id="screen-1">
        <text id="minutes">--</text>
        <text id="seconds" x="50">--</text>
        { repeat( 10, i => (
            <line id={'line-' + i} />
        ) )}
    </Screen>;