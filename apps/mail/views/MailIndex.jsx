const { useState, useEffect } = React
const { NavLink, Link, Outlet, useParams } = ReactRouterDOM
const { useNavigate } = ReactRouter


import { MailList } from "../cmps/MailList.jsx"
import { MailNavBar } from "../cmps/MailNavBar.jsx"
import { mailService } from "./../services/mail.service.js"

export function MailIndex() {

    const [mails, setMails] = useState(null)
    const [folderMail, setFolderMail] = useState('inbox')
    // const [isReadMail, setIsReadMail] = useState(false)
    const mailId = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        if (!mailId.mailId) loadMails()
        else loadMail(mailId.mailId)

        console.log(mailId.mailId)
    }, [mailId.mailId])

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

    // 1 function to remove / delete
    function onTrashMail(mailId) {
        console.log('trash', mailId)
        mailService.moveToTrash(mailId)
        setMails((prevMails) => prevMails.filter(mail => mail.id !== mailId))
        console.log(mails)
        console.log('Mail moved to trash successfully ')
        // showSuccessMsg(`Mail moved to trash successfully (${mailId})`)
    }


    function onReadMail(mailId) {
        console.log(mailId)
        mailService.readMail(mailId)
            .then(mail => {
                loadMail(mailId)
                // setMails(mail)
                // console.log(mail)
            })
        // navigate(`{/mail/${mailId}`)
    }

    console.log(mails)

    if (!mails) return
    return <section className="mail-index">


        {/* <React.Fragment className="nav-bar-container flex"> */}
        <MailNavBar />
        <nav className="nav-bar flex">

            <Link to="/mail/:mailId"></Link>
            <Link to="/mail/list" className="nav-bar-links" onClick={() => changeFolder(setFolderMail('inbox'))}>Inbox</Link>
            <Link to="/mail/list" className="nav-bar-links" onClick={() => changeFolder(setFolderMail('sent'))}>Sent</Link>
            <Link to="/mail/list" className="nav-bar-links" onClick={() => changeFolder(setFolderMail('trash'))}>Trash</Link>
            {/* <Link to="/mail/list" onClick={() => setIsSentBox(true)}>Sent</Link> */}

            {/* {isSentBox && */}
            {/* } */}
        </nav>
        <MailList mails={mails} onTrashMail={onTrashMail} onReadMail={onReadMail} />
        {/* </React.Fragment> */}
        <Outlet />

    </section>

}

