const { useState, useEffect } = React
const { Link, Outlet } = ReactRouterDOM

import { MailList } from "../cmps/MailList.jsx"
import { MailNavBar } from "../cmps/MailNavBar.jsx"
import { mailService } from "./../services/mail.service.js"

export function MailIndex() {

    const [mails, setMails] = useState(null)
    const [isSentBox, setIsSentBox] = useState(false)

    useEffect(() => {
        loadMails()
    }, [])

    function loadMails() {
        // mailService.query()
        //     .then(mails => {
        //         setMails(mails)
        //     })

        if (!isSentBox) {
            console.log('HHH')

            mailService.query()
                .then(mails => {
                    const inboxMails = mails.filter(mail => mail.to === 'user@appsus.com')
                    console.log(inboxMails)
                    setMails(inboxMails)

                })
            console.log(mails)

        }
    }



    function showInbox() {

    }

    function sentMailsBox() {
        setIsSentBox(true)
        mailService.query()
            .then(mails => { mails.filter(mail => mail.from !== 'user@appsus.com') })
    }

    function onRemoveMail(mailId) {
        onToggleToTrash(mailId)
        setMails((prevMails) => prevMails.filter(mail => mail.id !== mailId))
        console.log('Mail removed successfully ')
    }

    function onToggleToTrash(mailId) {
        mailService.get(mailId)
            .then(mailToTrash => {
                mailToTrash.toTrash = true
                console.log(mailToTrash)
            })
    }

    console.log(mails)


    if (!mails) return <div>Loading emails...</div>
    return <section className="mail-index">

        <MailNavBar />
        <nav>
            <Link to="/mail/:mailId">Read Mail(Details)</Link>
            <Link to="/mail/list">Sent</Link>

            {/* {isSentBox && */}
            {/* <MailList mails={mails} onRemoveMail={onRemoveMail} /> */}
            {/* } */}
        </nav>
        <Outlet />

    </section>

}

