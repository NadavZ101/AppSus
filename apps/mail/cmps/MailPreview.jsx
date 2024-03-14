const { Link } = ReactRouterDOM
const { useNavigate } = ReactRouter


export function MailPreview({ mail, onTrashMail, onReadMail }) {

    const navigate = useNavigate()

    function handleMailClick() {
        onReadMail(mail.id)
        navigate(`/mail/${mail.id}`)
    }

    function handleTrashClick(ev) {
        ev.stopPropagation()
        onTrashMail(mail.id)
    }

    return <tr className="mail-preview" onClick={handleMailClick}>
        <td>{mail.from}</td>
        <td>{mail.subject}</td>

        <td><button className="remove-btn" onClick={handleTrashClick}>Trash</button></td>
        {/* add trash icon */}

    </tr>
}