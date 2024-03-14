const { useNavigate } = ReactRouter


export function MailPreview({ mail, onTrashMail, onReadMail }) {

    const navigate = useNavigate()

    function setUnReadClass() {
        if (mail.isRead === false) return 'unread-mail'
        else return ''
    }

    function handleMailClick() {
        onReadMail(mail.id)
        navigate(`/mail/${mail.id}`)
    }

    function handleTrashClick(ev) {
        ev.stopPropagation()
        onTrashMail(mail.id)
    }

    return <tr className="mail-preview" onClick={handleMailClick}>
        <td className={setUnReadClass()}>{mail.from}</td>
        <td className={setUnReadClass()}>{mail.subject}</td>

        <td><button className="remove-btn" onClick={handleTrashClick}>Trash</button></td>
        {/* add trash icon */}

    </tr>
}