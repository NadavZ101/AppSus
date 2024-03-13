const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

import { MailPreview } from "../cmps/MailPreview.jsx"


export function MailList({ mails, onRemoveMail }) {

    return <div>Mail list

        <table className="mails-table flex">
            <thead>
            </thead>
            <tbody>
                {
                    mails.map((mail) => (<MailPreview key={mail.id} mail={mail} onRemoveMail={onRemoveMail} />))
                }
            </tbody>
        </table>
    </div>
}
