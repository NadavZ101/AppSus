const { useState, useEffect } = React
// const { Link, useSearchParams, useHistory } = ReactRouterDOM

import { MailPreview } from "../cmps/MailPreview.jsx"


export function MailList({ mails, onRemoveMail, onDeleteMail, onReadMail }) {

    console.log(mails)
    useEffect(() => {

    }, [])

    return <div>
        {
            <table className="mails-table flex">
                <thead>
                </thead>
                <tbody>
                    {
                        mails.map((mail) =>
                            (< MailPreview key={mail.id} mail={mail} onRemoveMail={onRemoveMail} onDeleteMail={onDeleteMail} onReadMail={onReadMail} />))
                    }
                </tbody>
            </table>
        }

    </div>
}




// mails.map(mail => {
//     mail.sentAt === null ? (
//         <MailPreview key={mail.id} mail={mail} onRemoveMail={onRemoveMail} />
//     ) : null
// })

// mails.map((mail) => (
//     <Link key={mail.id} to={`/mail/${mail.id}`}>
//         <table className="mails-table flex">
//             <tbody>
//                 <MailPreview mail={mail} onRemoveMail={onRemoveMail} />
//             </tbody>
//         </table>
//     </Link>
// ))
