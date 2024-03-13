

export function MailPreview({ mail }) {
    console.log(mail)

    return <article className="mail-preview">
        <h3>{mail.subject}</h3>
    </article>
}