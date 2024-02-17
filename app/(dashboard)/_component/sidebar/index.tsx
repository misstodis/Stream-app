import React from 'react'
import Wapper from './wapper'
import Toggle from './toggle'
import Navigation from './navigation'

type Props = {}

export default function SideBarDashBoard({ }: Props) {
    return (
        <Wapper>
            <Toggle />
            <Navigation />
        </Wapper>
    )
}