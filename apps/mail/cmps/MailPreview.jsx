const { Link } = ReactRouterDOM


export function MailPreview({ mail, onTrashMail, onDeleteMail, onReadMail }) {

    function handleMailClick() {
        onReadMail(mail.id)
    }

    function handleTrashClick(ev) {
        ev.stopPropagation()
        onTrashMail(mail.id)
    }
    // function handleDeleteClick(ev) {
    //     onDeleteMail(mail.id)
    // }
    return <tr className="mail-preview" onClick={handleMailClick}>
        <td>{mail.from}</td>
        <td>{mail.subject}</td>

        <td><button className="remove-btn" onClick={handleTrashClick}>Trash</button></td>
        {/* add trash icon */}

    </tr>
}