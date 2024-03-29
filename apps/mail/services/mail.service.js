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
    remove,
    readMail,
    getDefaultFilter,
    getFilterFromParams,
}

// Debugging 
window.es = mailService

_createMails()

function query(filterBy = getDefaultFilter()) {
    console.log('filterBy', filterBy)

    return storageAsyncService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.subject) {
                console.log('filterBy', filterBy)
                console.log('HEHEHEHE')
                const regex = new RegExp(filterBy.subject, 'i')
                mails = mails.filter(mail => regex.test(mail.subject))

                console.log(mails)
            }
            if (filterBy.isRead !== undefined) {
                const statusBool = filterBy.isRead === 'true'
                mails = mails.filter(mail =>
                    mail.isRead === statusBool)
            }
            if (filterBy.removedAt) {
                mails = mails.filter(mail => {
                    return mail.removedAt !== null
                })
            }
            if (filterBy.sentAt) {
                mails = mails.filter(mail => {
                    return mail.sentAt !== null || mail.sentAt !== ''
                })
            }
            console.log(mails)
            return mails
        })
}

// function query() {
//     return storageAsyncService.query(MAIL_KEY)
// }

function getDefaultFilter() {
    return { subject: '', isRead: false, removedAt: null, sentAt: null }
}

function getFilterFromParams(searchParams = {}) {
    const defaultFilter = getDefaultFilter()
    return {
        subject: searchParams.get('subject') || defaultFilter.subject,
        // mailReadingStatus: searchParams.get('mailStatus') || defaultFilter.mailReadingStatus
    }
}

function get(mailId) {
    console.log('service get ->  mailId = ', mailId)
    return storageAsyncService.get(MAIL_KEY, mailId)
        .then(mail => _setNextPrevMailId(mail))
}

function save(mail) {
    let { subject, from, to, body, sentAt } = mail

    if (mail.id) {
        console.log(mail)
        return storageAsyncService.put(MAIL_KEY, mail)
    } else {
        sentAt = Date.now()
        from = loggedinUser.email

        mail = _createMail(subject, from, to, body, sentAt)
        return storageAsyncService.post(MAIL_KEY, mail)
    }
}

function moveToTrash(mailId) {
    get(mailId)
        .then(mail => {
            if (mail.removedAt === null) {

                console.log(mail)
                mail.removedAt = Date.now()
                console.log(mail)
                save(mail)
            } else {
                remove(mailId)
            }
        })
}

function remove(mailId) {
    return storageAsyncService.remove(MAIL_KEY, mailId)
}

function readMail(mailId) {
    console.log(mailId)
    return get(mailId)
        .then(mail => {
            console.log(mail)
            mail.isRead = true
            return save(mail)
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
        emails.push(_createMail(' Offer from Nigirian Prince ', email.from, loggedinUser.email))
        emails.push(_createMail('Now hiring: “developer” at Expert Executive Recruiters ', email.from = 'Linkedin', loggedinUser.email))
        emails.push(_createMail('WIN £250 LACED CREDIT', email.from = 'Laced', loggedinUser.email))
        emails.push(_createMail(' Welcome to Google Cloud ', email.from = 'Google Cloud', loggedinUser.email))
        emails.push(_createMail(' Buy more storage space ', email.from = 'DropBox', loggedinUser.email))
        emails.push(_createMail(' 1 day left: Get an exclusive dedicated IP deal for our users only ', email.from = 'The NordVPN team', loggedinUser.email))
        emails.push(_createMail('Visit Rome', email.from = 'TripAdvisor', loggedinUser.email))
        emails.push(_createMail(' Mizuno,ELLESSE,BUFF ®  ', email.from = 'Outletinn', loggedinUser.email))
        emails.push(_createMail(' Lead effectively in an era of digital transformation', email.from = 'edX Team', loggedinUser.email))
        emails.push(_createMail(' Your Sierra Pet Meds Order Has Been Updated ', email.from = 'Sierra Pet Meds', loggedinUser.email))
        emails.push(_createMail(' Last chance to register for AWS Innovate Online ', email.from = 'TripAdvisor', loggedinUser.email))
        emails.push(_createMail(' Visit Rome ', email.from = 'Amazon Web Services', loggedinUser.email))
        emails.push(_createMail(' Visit Athens ', email.from = 'TripAdvisor', loggedinUser.email))
        emails.push(_createMail(' Checkout the new Nike Air 16 ', email.from = 'Outletinn', loggedinUser.email))
        emails.push(_createMail(' [GitHub] Please review this sign in ', email.from = 'GitHub', loggedinUser.email))
        emails.push(_createMail(' Lesson complete! ', email.from = 'Codecademy', loggedinUser.email))
        emails.push(_createMail(' Udacity Password Reset ', email.from = 'Udacity', loggedinUser.email))
        emails.push(_createMail(' Your Apple ID information has been updated', email.from = 'Apple', loggedinUser.email))
        emails.push(_createMail(' Get started with Amazon Web Services (AWS) ', email.from = 'Amazon Web Services', loggedinUser.email))
        emails.push(_createMail(' Visit Madrid ', email.from = 'TripAdvisor', loggedinUser.email))
        emails.push(_createMail(' Datacube - Business Intelligence Developer and more ', email.from = 'LinkedIn Job Alerts', loggedinUser.email))
        emails.push(_createMail(' Vote in the Final Round of the Goodreads Choice Awards ', email.from = 'Goodreads', loggedinUser.email))
        emails.push(_createMail(' Visit London ', email.from = 'TripAdvisor', loggedinUser.email))

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

