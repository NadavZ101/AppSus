const { useState, useEffect } = React

import { mailService } from "./../services/mail.service.js"

export function MailIndex() {

    const [mails, setMails] = useState(null)

    useEffect(() => {
        loadMails()
    }, [])

    function loadMails() {
        mailService.query()
            .then(mails => {
                setMails(mails)
            })
    }

    if (!mails) return <div>Loading emails...</div>
    return <section className="mail-index">

        <ul>
            {
                mails.map(mail => <li key={mail.id}>
                    {mail.from}
                    {mail.subject}
                    {mail.sentAt}
                </li>)
            }
        </ul>

        <div>mail app</div>
    </section>

}

