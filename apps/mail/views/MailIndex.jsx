const { useState, useEffect } = React
const { Link, Outlet, useParams } = ReactRouterDOM

import { MailList } from "../cmps/MailList.jsx"
import { MailNavBar } from "../cmps/MailNavBar.jsx"
import { mailService } from "./../services/mail.service.js"

export function MailIndex() {

    const [mails, setMails] = useState(null)
    const [isSentBox, setIsSentBox] = useState('inbox')
    const mailId = useParams()

    useEffect(() => {
        if (!mailId.mailId) loadMails()
        else loadMail(mailId.mailId)
        console.log(mailId)
    }, [mailId.mailId])

    function changeFolder() {
        switch (isSentBox) {
            case 'inbox':
                value = 'inbox'
                break
            case 'sent':
                value = 'sent'
                break
            case 'trash':
                value = 'trash'
                break
            case 'draft':
                value = 'draft'
            default:
                break
        }
    }

    function loadMails() {
        console.log('loadMails')
        if (isSentBox === 'inbox') {
            mailService.query()
                .then(mails => {
                    const inboxMails = mails.filter(mail => mail.to === 'user@appsus.com' && !mail.removedAt)
                    console.log('inbox = ', inboxMails)
                    setMails(inboxMails)
                })

        } else if (isSentBox === 'sent') {
            mailService.query()
                .then(mails => {
                    const sentMails = mails.filter(mail => mail.to !== 'user@appsus.com' && !mail.removedAt)
                    console.log('sent box = ', sentMails)
                    setMails(sentMails)
                })

        } else if (isSentBox === 'trash') {
            mailService.query()
                .then(mails => {
                    const trashMails = mails.filter(mail => mail.removedAt)
                    console.log('trash box = ', trashMails)
                    setMails(trashMails)
                })
        }
    }

    function loadMail(mailId) {
        let singleMail = []
        mailService.get(mailId)
            .then(mail => {
                singleMail.push(mail)
                setMails(singleMail)
            })
    }

    function onTrashMail(mailId) {
        mailService.moveToTrash(mailId)
        setMails((prevMails) => prevMails.filter(mail => mail.id !== mailId))
        console.log(mails)
        console.log('Mail moved to trash successfully ')
        // showSuccessMsg(`Mail moved to trash successfully (${mailId})`)
    }

    function onDeleteMail(mailId) {
        console.log(mailId)
        mailService.remove(mailId)
            .then(() => {
                setMails((prevMails) => prevMails.filter(mail => mail.id !== mailId))
                console.log('Mail deleted successfully ')
                // showSuccessMsg(`Mail deleted successfully (${mailId})`)
            })
            .catch((err) => {
                console.log('Couldn\'t delete mail', err)
                // showErrorMsg(`Couldn\'t delete mail (${mailId})`)
            })
    }

    console.log(mails)

    if (!mails) return
    return <section className="mail-index">

        <MailNavBar />
        <nav>
            <Link to="/mail/:mailId">Read Mail(Details)</Link>
            <Link to="/mail/list" onClick={() => changeFolder(setIsSentBox('inbox'))}>Inbox</Link>
            <Link to="/mail/list" onClick={() => changeFolder(setIsSentBox('sent'))}>Sent</Link>
            <Link to="/mail/list" onClick={() => changeFolder(setIsSentBox('trash'))}>Trash</Link>
            {/* <Link to="/mail/list" onClick={() => setIsSentBox(true)}>Sent</Link> */}

            {/* {isSentBox && */}
            <MailList mails={mails} onRemoveMail={onTrashMail} onDeleteMail={onDeleteMail} />
            {/* } */}
        </nav>
        <Outlet />

    </section>

}

