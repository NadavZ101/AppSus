const { useState, useEffect } = React

import { mailService } from "./../services/mail.service.js"
// import { showSuccessMsg, showErrorMsg } from './../services/event-bus.service.js'


export function WriteMail({ setIsOnCompose }) {

    const [mailToWrite, setMailToWrite] = useState(mailService.getEmptyMail())

    useEffect(() => {

    }, [])

    function handleInput(ev) {
        let { value, name: field } = ev.target
        console.log(value)

        setMailToWrite(prevMail => ({ ...prevMail, [field]: value }))
        console.log(mailToWrite)
    }

    function onWriteMail(ev) {
        ev.preventDefault()

        console.log(ev)
        mailService.save(mailToWrite)
            .then(sentMail => {
                console.log('Mail sent be successfully ', sentMail)
                // showSuccessMsg(`Mail sent successfully ${sentMail.id}`)
            })
            .catch(err => {
                console.error('Mail couldn\'t be sent ', err)
                // showErrorMsg(`Could not send mail`)
            })

        closeModal()

    }

    function closeModal() {
        setIsOnCompose(false)
    }


    const { subject, body, to } = mailToWrite

    return <form onSubmit={onWriteMail}>
        <div className="input-container flex align-center">
            <label htmlFor="subject">Subject:</label>
            <input
                type="text"
                id="subject"
                name="subject"
                onChange={handleInput}
                value={subject}
                required
            />
        </div>

        <div className="input-container flex align-center">
            <label htmlFor="email">To:</label>
            <input
                type="email"
                id="email"
                name="to"
                // handleInput expects the name attribute of the input field to match the property name in the state object that it intends to update.

                onChange={handleInput}
                value={mailToWrite.to || ''}
                required
            />
        </div>

        <div className="input-container flex align-center">
            <label htmlFor="body"></label>
            <input
                type="text"
                id="body"
                name="body"
                onChange={handleInput}
                value={body}
            />

        </div>
        <button >Send</button>

    </form>

}

// onClick={() => { setIsOnCompose(false) }}