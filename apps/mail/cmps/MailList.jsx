const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

import { MailPreview } from "../cmps/MailPreview.jsx"


export function MailList({ mails, onRemoveMail }) {
    console.log('mail list - mails', mails)



    return <div>Mail list

        <table className="mails-table flex">
            <thead>
            </thead>
            <tbody>
                {
                    mails.map(mail =>
                        <tr className="mail" key={mail.id}>
                            <Link to={`/mail/${mail.id}`}>

                                <td>{mail.from}</td>
                                <td>{mail.subject}</td>

                                {/* call LongTXT */}
                                {/* <td>{mail.body}</td> */}

                                <td>{mail.sentAt}</td>
                                <td><button className="remove-btn"
                                    onClick={() => onRemoveMail(mail.id)}>X</button>
                                </td>

                                <MailPreview mail={mail} />
                            </Link>
                        </tr>)
                }
            </tbody>
        </table>

    </div>
}
