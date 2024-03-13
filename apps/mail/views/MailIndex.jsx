const { useState, useEffect } = React

import { MailList } from "../cmps/MailList.jsx"
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

    function onRemoveMail(mailId) {
        setMails((prevMails) => prevMails.filter(mail => mail.id !== mailId))
        console.log('Car removed successfully ')
    }


    if (!mails) return <div>Loading emails...</div>
    return <section className="mail-index">

        <MailList mails={mails} onRemoveMail={onRemoveMail} />

    </section>

}

