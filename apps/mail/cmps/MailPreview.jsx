const { useNavigate } = ReactRouter

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-regular-svg-icons'

export function MailPreview({ mail, onTrashMail, onReadMail }) {

    const navigate = useNavigate()

    function setUnReadClass() {
        if (mail.isRead === false) return 'unread-mail'
        else return 'read-mail'
    }

    function handleMailClick() {
        onReadMail(mail.id)
        navigate(`/mail/${mail.id}`)
    }

    function handleTrashClick(ev) {
        ev.stopPropagation()
        onTrashMail(mail.id)
    }

    return <tr className="mail-preview flex" onClick={handleMailClick}>
        <td className={setUnReadClass()}>{mail.from}</td>
        <td className={setUnReadClass()}>{mail.subject}</td>

        <td><button className="remove-btn" onClick={handleTrashClick}>
            {/* <FontAwesomeIcon icon={faTrash} /> */}
        </button>
        </td>
        {/* add trash icon */}

    </tr>
}