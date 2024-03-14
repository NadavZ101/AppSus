
const { useState } = React

import { WriteMail } from '../cmps/WriteMail.jsx'


export function MailNavBar() {

    const [isOnCompose, setIsOnCompose] = useState(false)

    // const openCompose = () => setIsOnCompose(true)
    // const closeCompose = () => setIsOnCompose(false)

    return <div className="nav-bar flex">
        <button onClick={() => setIsOnCompose(true)}>Compose</button>
        {isOnCompose &&
            <WriteMail setIsOnCompose={() => setIsOnCompose(false)} />
        }
    </div>
}

// 