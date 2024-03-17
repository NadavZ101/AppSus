const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter
const { Link } = ReactRouterDOM

import { mailService } from "./../services/mail.service.js"

export function MailDetails() {

    const [isLoading, setIsLoading] = useState(true)
    const [mail, setMail] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadMail()
    }, [params.mailId])


    function loadMail() {
        setIsLoading(true)
        mailService.get(params.mailId)
            .then(mail => setMail(mail))
            .catch(err => {
                console.log('Had issues loading mail', err)
                navigate('/mail')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }
    console.log(mail)

    if (isLoading) return <div>Loading Mail...</div>
    return <section className="mail-details">

        <div className="details-act-bts">
            <Link to="/mail"><button className="arrows-btn" ><i class="fa-solid fa-arrow-left"></i></button></Link>

            <div className="next-prev-btns">
                <Link to={`/mail/${mail.prevMailId}`}><button className="arrows-btn" ><i className="fa-solid fa-arrow-left"></i></button></Link>
                <Link to={`/mail/${mail.nextMailId}`}><button className="arrows-btn" ><i className="fa-solid fa-arrow-right"></i></button></Link>
            </div>
        </div>

        <div className="mails-details-container flex space-between">
            <div className="subject">{mail.subject}</div>
            <div className="from-date flex space-between">
                <div className="from">{mail.from}</div>
                <div className="date">{mail.sentAt}</div>
            </div>
            <div className="message">{mail.body}</div>
        </div>

    </section>

}

// const email = {
//     id: 'e101',
//     subject: 'Miss you!'
//     ,
//     body: 'Would love to catch up sometimes'
//     ,
//     isRead: false,
//     sentAt: 1551133930594,
//     removedAt: null,
//     from: 'momo@momo.com',
//     to: 'user@appsus.com'
// }