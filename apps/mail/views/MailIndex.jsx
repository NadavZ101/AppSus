const { useState, useEffect } = React
const { Link, Outlet, useParams, useSearchParams } = ReactRouterDOM
const { useNavigate } = ReactRouter


import { MailList } from "../cmps/MailList.jsx"
import { MailNavBar } from "../cmps/MailNavBar.jsx"
import { MailFilter } from "../cmps/MailFilter.jsx"
import { mailService } from "./../services/mail.service.js"

export function MailIndex() {
    const [searchParams, setSearchParams] = useSearchParams()

    const [mails, setMails] = useState(null)
    const [unreadMails, setUnreadMails] = useState(null)
    const [folderMail, setFolderMail] = useState('inbox')
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromParams(searchParams))
    const mailId = useParams()

    // console.log(filterBy)

    const navigate = useNavigate()

    useEffect(() => {
        // setSearchParams(filterBy)
        console.log('FolderMail state updated to:', folderMail)

        if (!mailId.mailId) loadMails()
        else loadMail(mailId.mailId)
        console.log(mailId.mailId)

        onCountUnreadMails()

    }, [folderMail, mailId.mailId, filterBy])

    function changeFolder(selectedFolder) {
        console.log('selected folder ', selectedFolder)
        // setFolderMail(selectedFolder)
        // console.log('Folder changed to:', folderMail)
        setFolderMail(selectedFolder)
        console.log('folderMail =  ', folderMail)

        // setFilterBy({ ...filterBy, folderMail: selectedFolder })
    }


    // function loadMails(folder) {
    //     console.log('Loading mails for folder:', folder)
    //     mailService.query(filterBy).then(mails => {
    //         let filteredMails
    //         if (folder === 'inbox') {
    //             filteredMails = mails.filter(mail => mail.to === 'user@appsus.com' && !mail.removedAt)
    //         } else if (folder === 'sent') {
    //             filteredMails = mails.filter(mail => mail.from === 'user@appsus.com' && !mail.removedAt)
    //         } else if (folder === 'trash') {
    //             filteredMails = mails.filter(mail => mail.removedAt)
    //         }
    //         console.log(`${folder} = `, filteredMails)
    //         setMails(filteredMails)
    //     })
    // }

    function loadMails() {
        console.log('Loading mails for folder:', folderMail)
        if (folderMail === 'inbox') {
            mailService.query(filterBy)
                .then(mails => {
                    const inboxMails = mails.filter(mail => mail.to === 'user@appsus.com' && !mail.removedAt)
                    console.log('inbox = ', inboxMails)
                    setMails(inboxMails)
                })

        } else if (folderMail === 'sent') {
            mailService.query(filterBy)
                .then(mails => {
                    const sentMails = mails.filter(mail => mail.to !== 'user@appsus.com' && !mail.removedAt)
                    console.log('sent box = ', sentMails)
                    setMails(sentMails)
                })

        } else if (folderMail === 'trash') {
            mailService.query(filterBy)
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
                onCountUnreadMails()

            })
        // navigate(`{/mail/${mailId}`)
    }

    function onCountUnreadMails() {
        mailService.query()
            .then(mails => {
                const unreadCount = mails.filter(mail => !mail.isRead && mail.to === 'user@appsus.com')
                console.log(unreadCount.length)
                setUnreadMails(unreadCount.length > 0 ? unreadCount : [])
            })
    }

    function onSetFilter(fieldsToUpdate) {
        console.log('fieldsToUpdate', fieldsToUpdate)

        setFilterBy(prevFilter => ({ ...prevFilter, ...fieldsToUpdate }))
    }

    console.log(mails)

    if (!mails) return
    return <section className="mail-index">

        <MailFilter onSetFilter={onSetFilter} filterBy={filterBy} />

        <MailNavBar />
        {/*  */}
        <nav className="sidebar-menu flex">

            <Link to="/mail/:mailId"></Link>
            <Link to="#" onClick={() => { changeFolder('inbox') }}>Inbox ({unreadMails.length})</Link>
            <Link to="#" onClick={() => { changeFolder('sent') }}>Sent</Link>
            <Link to="#" onClick={() => { changeFolder('trash') }}>Trash</Link>
            {/* <Link to="#" onClick={() => { changeFolder('unread') }}>Unread Mails </Link> */}


            <MailList mails={mails} onTrashMail={onTrashMail} onReadMail={onReadMail} onCountUnreadMails={onCountUnreadMails} />
        </nav>
        {/* </React.Fragment> */}
        <Outlet />
    </section>

}

{/* <Link to="/mail/list" className="sidebar-menu-links" onClick={() => changeFolder('inbox')}>Inbox({unreadMails.length})</Link>
            <Link to="/mail/list" className="sidebar-menu-links" onClick={() => changeFolder('sent')}>Sent</Link>
            <Link to="/mail/list" className="sidebar-menu-links" onClick={() => changeFolder('trash')}>Trash</Link> */}

