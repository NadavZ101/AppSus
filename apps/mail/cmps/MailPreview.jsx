const { useNavigate } = ReactRouter

import { FontAwesomeIcon } from '@fontawesome/react-fontawesome'
import { faTrash } from '@fontawesome/free-regular-svg-icons'

export function MailPreview({ mail, onTrashMail, onReadMail, onCountUnreadMails }) {

    const navigate = useNavigate()

    function setUnReadClass() {
        if (mail.to === 'user@appsus.com' && mail.isRead === false) return 'unread-mail'
        else return 'read-mail'
    }

    function handleMailClick() {
        onReadMail(mail.id)
        onCountUnreadMails()
        navigate(`/mail/${mail.id}`)
    }

    function handleTrashClick(ev) {
        ev.stopPropagation()
        onTrashMail(mail.id)
    }

    return <tr className={`mail-preview flex ${setUnReadClass()}`} onClick={handleMailClick}>
        <td className="from">{mail.from}</td>
        <td className="subject">{mail.subject}</td>

        <td className="remove-btn-container">
            <button className="remove-btn" onClick={handleTrashClick}>
                <i className="fa-solid fa-trash"></i>
            </button>
        </td>

    </tr>
}