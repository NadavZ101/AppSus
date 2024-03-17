const { useState, useEffect } = React

import { mailService } from "./../services/mail.service.js"
// import { showSuccessMsg, showErrorMsg } from './../services/event-bus.service.js'


export function WriteMail({ onComposeMail, isOnCompose, setCompose, onSetCompose }) {

    const [mailToWrite, setMailToWrite] = useState(mailService.getEmptyMail())

    const [modal, setModal] = useState(false)

    // console.log(isOnCompose)
    // console.log(onComposeMail)
    // console.log(setCompose)
    console.log(onSetCompose)


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
        onComposeMail(false)
    }


    const { subject, body, to } = mailToWrite

    return <div className="modal-overlay">
        <div className="modal flex">
            <form className="modal-content" onSubmit={onWriteMail}>
                <div className="modal-header"> <span className="modal-header-txt">New message</span>

                    <button className="modal-close-btn" type="button" onClick={() => closeModal()}>X
                    </button>

                </div>

                <div className="input-container flex align-center">
                    <label htmlFor="email">To</label>
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
                    <label htmlFor="subject">Subject</label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        onChange={handleInput}
                        value={subject}
                        required
                    />
                </div>


                <div className="input-container flex">
                    <label htmlFor="body"></label>
                    <textarea
                        type="text"
                        id="body"
                        name="body"
                        onChange={handleInput}
                        value={body}
                    />

                </div>
                <button className="send-btn">Send</button>
            </form>
        </div>
    </div>
}

// onClick={() => { setIsOnCompose(false) }}