const { useState, useEffect } = React
const { Link, Outlet, useParams } = ReactRouterDOM

import { MailList } from "../cmps/MailList.jsx"
import { MailNavBar } from "../cmps/MailNavBar.jsx"
import { mailService } from "./../services/mail.service.js"

export function MailIndex() {

    const [mails, setMails] = useState(null)
    const [folderMail, setFolderMail] = useState('inbox')
    const [isReadMail, setIsReadMail] = useState(false)
    const mailId = useParams()

    useEffect(() => {
        if (!mailId.mailId) loadMails()
        else loadMail(mailId.mailId)
        console.log(mailId)
    }, [mailId.mailId, isReadMail])

    function changeFolder() {
        switch (folderMail) {
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
        if (folderMail === 'inbox') {
            mailService.query()
                .then(mails => {
                    const inboxMails = mails.filter(mail => mail.to === 'user@appsus.com' && !mail.removedAt)
                    console.log('inbox = ', inboxMails)
                    setMails(inboxMails)
                })

        } else if (folderMail === 'sent') {
            mailService.query()
                .then(mails => {
                    const sentMails = mails.filter(mail => mail.to !== 'user@appsus.com' && !mail.removedAt)
                    console.log('sent box = ', sentMails)
                    setMails(sentMails)
                })

        } else if (folderMail === 'trash') {
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

    function onReadMail(mailId) {
        console.log(mailId)
        mailService.readMail(mailId)
            .then(mail => {
                console.log(mail)
                setIsReadMail(...mail, mail.isRead)
                console.log(mail)

            })
    }

    console.log(mails)

    if (!mails) return
    return <section className="mail-index">

        <MailNavBar />
        <nav>
            <Link to="/mail/:mailId">Read Mail(Details)</Link>
            <Link to="/mail/list" onClick={() => changeFolder(setFolderMail('inbox'))}>Inbox</Link>
            <Link to="/mail/list" onClick={() => changeFolder(setFolderMail('sent'))}>Sent</Link>
            <Link to="/mail/list" onClick={() => changeFolder(setFolderMail('trash'))}>Trash</Link>
            {/* <Link to="/mail/list" onClick={() => setIsSentBox(true)}>Sent</Link> */}

            {/* {isSentBox && */}
            <MailList mails={mails} onRemoveMail={onTrashMail} onDeleteMail={onDeleteMail} onReadMail={onReadMail} />
            {/* } */}
        </nav>
        <Outlet />

    </section>

}

