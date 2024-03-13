// mail service
import { storageService } from "../../../services/storage.service.js"
import { storageAsyncService } from "../../../services/async-storage.service.js"
import { utilService } from "../../../services/util.service.js"

const MAIL_KEY = 'mailDB'

// Email Modal
const email = {
    id: 'e101',
    subject: 'Miss you!'
    ,
    body: 'Would love to catch up sometimes'
    ,
    isRead: false,
    sentAt: 1551133930594,
    removedAt: null,
    from: 'momo@momo.com',
    to: 'user@appsus.com'
}

// Basic User
const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

export const mailService = {
    query,
    get,
}

// Debugging 
window.es = mailService

_createMails()

function query() {
    return storageAsyncService.query(MAIL_KEY)
}

function get(mailId) {
    console.log('service-get ->  mailId', mailId)
    return storageAsyncService.get(MAIL_KEY, mailId)
        .then(mail => _setNextMailId(mail))
}

// function removeFromIndex(emailId) {
//     console.log(emailId)
//     query()
//         .then(emails => {
//             const newEmails = emails.filter(email => email.id !== emailId)
//         })
//     console.log('removeFromIndex - newEmails', newEmails)
//     return newEmails
// }

function getEmptyEmail(id = '', subject = '', body = '', isRead = false, sentAt = '', removedAt = null, from = '', to = '') {
    return { id, subject, body, isRead, sentAt, removedAt, from, to }
}

function _setNextMailId(mail) {
    return storageAsyncService.query(MAIL_KEY)
        .then((mails) => {
            const mailIdx = mails.findIndex((currMail) => currMail.id === mail.id)
            const nextMail = mails[mailIdx + 1] ? mails[mailIdx + 1] : mails[0]
            const prevMail = mails[mailIdx - 1] ? mails[mailIdx - 1] : mails[mails.length - 1]
            mail.nextMailId = nextMail.id
            mail.prevMailId = prevMail.id
            return mail
        })
}

function _createMails() {
    let emails = storageService.loadFromStorage(MAIL_KEY)
    if (!emails || !emails.length) {
        emails = []
        emails.push(_createEmail('Hello Haim', loggedinUser.fullname, loggedinUser.email))
        emails.push(_createEmail('Whats up Nadav?', loggedinUser.fullname, loggedinUser.email))
        emails.push(_createEmail(' Offer from Nigirian Prince ', loggedinUser.fullname, loggedinUser.email))
        console.log('service -> _createMails -> emails', emails)

        storageService.saveToStorage(MAIL_KEY, emails)
    }

}

function _createEmail(subject, from, to) {
    const email = getEmptyEmail()
    email.id = utilService.makeId()
    email.from = from
    email.to = to
    email.subject = subject
    email.body = utilService.makeLorem(70)
    email.sentAt = new Date().getTime()
    console.log('service -> _createEmail -> email', email)
    return email
}

