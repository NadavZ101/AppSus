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

    if (isLoading) return
    return <section className="mail-details">
        <Link to="/mail"><button>←</button></Link> {/* switch to icon */}

        <h3>{mail.subject}</h3>
        <h5>{mail.from}</h5>
        <div>{mail.sentAt}</div>
        <div>{mail.body}</div>

        <div className="details-actions flex justify-between">
            {/* switch to icons */}
            <Link to={`/mail/${mail.prevMailId}`}><button>Prev Mail</button></Link>
            <Link to={`/mail/${mail.nextMailId}`}><button>Next Mail</button></Link>
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