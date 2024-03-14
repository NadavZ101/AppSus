

export function MailPreview({ mail, onRemoveMail }) {

    return <tr className="mail-preview">
        <td>{mail.from}</td>
        <td>{mail.subject}</td>
        {/* <td>{mail.sentAt}</td> */}
        <td><button className="remove-btn" onClick={() => onRemoveMail(mail.id)}>X</button></td>
    </tr>
}