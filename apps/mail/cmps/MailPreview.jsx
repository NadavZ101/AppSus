

export function MailPreview({ mail, onRemoveMail, onDeleteMail }) {

    return <tr className="mail-preview">
        <td>{mail.from}</td>
        <td>{mail.subject}</td>
        {/* <td>{mail.sentAt}</td> */}
        <td><button className="remove-btn" onClick={() => onRemoveMail(mail.id)}>Trash</button></td>
        {/* add trash icon */}

        <td><button className="remove-btn" onClick={() => onDeleteMail(mail.id)}>Delete</button></td>
        {/* add trash icon */}

    </tr>
}