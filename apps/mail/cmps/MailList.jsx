const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

import { MailPreview } from "../cmps/MailPreview.jsx"


export function MailList({ mails, onRemoveMail }) {

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
                        <React.Fragment>
                            {
                                mails.map((mail) =>
                                    (< MailPreview key={mail.id} mail={mail} onRemoveMail={onRemoveMail} />))
                            }
                        </React.Fragment>
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
