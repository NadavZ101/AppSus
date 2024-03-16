
const { useState } = React

import { WriteMail } from '../cmps/WriteMail.jsx'


export function MailNavBar({ isOnCompose, onComposeMail }) {

    return (
        <div className="nav-bar flex">
            <button className="compose-btn" onClick={() => onComposeMail(true)}>
                <i className="fa-solid fa-pencil"></i>Compose
            </button>
            {isOnCompose && <WriteMail onComposeMail={onComposeMail} />}
        </div>
    )

    {/* return <div className="nav-bar flex">
            <button className="compose-btn" onClick={() => setIsOnCompose(true)}>
                <i className="fa-solid fa-pencil"></i>Compose</button>
            {isOnCompose &&
                <WriteMail setIsOnCompose={() => setIsOnCompose(false)} />
        </div >
        } */}
}

