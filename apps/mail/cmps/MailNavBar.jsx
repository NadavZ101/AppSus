
const { useState } = React

import { WriteMail } from '../cmps/WriteMail.jsx'


export function MailNavBar() {

    const [isOnCompose, setIsOnCompose] = useState(false)

    return <div className="nav-bar flex">
        <button className="compose-btn" onClick={() => setIsOnCompose(true)}>
            <i className="fa-solid fa-pencil"></i>Compose</button>
        {isOnCompose &&
            <WriteMail setIsOnCompose={() => setIsOnCompose(false)} />
        }
    </div>
}

// 