const { useState, useEffect } = React
const { Link, Outlet, useParams } = ReactRouterDOM

import { MailList } from "../cmps/MailList.jsx"
import { MailNavBar } from "../cmps/MailNavBar.jsx"
import { mailService } from "./../services/mail.service.js"

export function MailIndex() {

    const [mails, setMails] = useState(null)
    const [isSentBox, setIsSentBox] = useState(false)
    const mailId = useParams()

    useEffect(() => {
        if (!mailId.mailId) loadMails()
        console.log(mailId)
    }, [mailId.mailId])

    function loadMails() {
        console.log('loadMails')
        if (!isSentBox) {
            mailService.query()
                .then(mails => {
                    const inboxMails = mails.filter(mail => mail.to === 'user@appsus.com' && !mail.removedAt)
                    console.log('inbox = ', inboxMails)
                    setMails(inboxMails)
                })

        } else {
            mailService.query()
                .then(mails => {
                    const sentMails = mails.filter(mail => mail.to !== 'user@appsus.com' && !mail.removedAt)
                    console.log('sent box = ', sentMails)
                    setMails(sentMails)
                })
        }
    }

    function onRemoveMail(mailId) {
        mailService.moveToTrash(mailId)
        // .then(mail => mail.removedAt = Date.now())
        setMails((prevMails) => prevMails.filter(mail => mail.id !== mailId))
        console.log(mails)
        console.log('Mail removed successfully ')
    }

    console.log(mails)

    if (!mails) return
    return <section className="mail-index">

        <MailNavBar />
        <nav>
            <Link to="/mail/:mailId">Read Mail(Details)</Link>
            <Link to="/mail/list" onClick={() => setIsSentBox(false)}>Inbox</Link>
            <Link to="/mail/list" onClick={() => setIsSentBox(true)}>Sent</Link>

            {/* {isSentBox && */}
            <MailList mails={mails} onRemoveMail={onRemoveMail} />
            {/* } */}
        </nav>
        <Outlet />

    </section>

}

