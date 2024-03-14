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

// Basic user
const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

export const mailService = {
    query,
    get,
    save,
    getEmptyMail,
    getFormatMonthYear,
    moveToTrash,
}

// Debugging 
window.es = mailService

_createMails()

function query() {
    return storageAsyncService.query(MAIL_KEY)
}

function get(mailId) {
    console.log('service get ->  mailId = ', mailId)
    return storageAsyncService.get(MAIL_KEY, mailId)
        .then(mail => _setNextPrevMailId(mail))
}

function save(mail) {
    let { subject, from, to, body, sentAt } = mail
    console.log(mail)
    if (mail.id) {
        return storageAsyncService.put(MAIL_KEY, mail)
    } else {
        sentAt = Date.now()
        from = loggedinUser.email
        mail = _createMail(subject, from, to, body, sentAt)
        return storageAsyncService.post(MAIL_KEY, mail)
    }
}

function moveToTrash(mailId) {
    console.log(mailId)
    get(mailId)
        .then(mail => {
            mail.removedAt = Date.now()
            console.log(mail)
            save(mail)
        })
}

function getEmptyMail(id = '', subject = '', body = '', isRead = false, sentAt = '', removedAt = null, from = '', to = '') {
    return { id, subject, body, isRead, sentAt, removedAt, from, to }
}

function _setNextPrevMailId(mail) {
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
        emails.push(_createMail('Hello Haim', email.from, loggedinUser.email))
        emails.push(_createMail('Whats up Nadav?', email.from, loggedinUser.email))
        emails.push(_createMail(' Offer from Nigirian Prince ', email.from, loggedinUser.email))
        console.log('service -> _createMails -> emails', emails)

        storageService.saveToStorage(MAIL_KEY, emails)
    }

}

function _createMail(subject, from, to, body, sentAt) {
    console.log(from)
    const email = getEmptyMail()
    email.id = utilService.makeId()
    email.from = from
    email.to = to
    email.subject = subject
    email.body = body || utilService.makeLorem(70)
    email.sentAt = sentAt || getFormatMonthYear(new Date())
    // console.log('service -> _createEmail -> email', email)
    return email
}

function getFormatMonthYear(date) {
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const month = monthNames[date.getMonth()]
    const year = date.getFullYear()
    return `${month}/${year}`
}

