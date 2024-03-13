import { storageService } from "../../../services/storage.service.js"
import { storageAsyncService } from "../../../services/async-storage.service.js"
import { utilService } from "../../../services/util.service.js"

const NOTE_KEY = 'noteDB'
_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    getDefaultFilter,
    // getFilterFromParams
}

function query(filterBy = getDefaultFilter()) {
    console.log('filterBy', filterBy)

    return storageAsyncService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.title, 'i')
                notes = notes.filter(note => regex.test(note.info.title))
            }
            if (filterBy.type) {
                notes = notes.filter(note => note.type)
            }

            return notes
        })
}

function getDefaultFilter() {
    return { title: '', type: 'NoteTxt' }
}

function get(noteId) {
    return storageAsyncService.get(NOTE_KEY, noteId)
    // .then(car => _setNextPrevCarId(note))
    // return axios.get(CAR_KEY, carId)
}

function remove(noteId) {
    return storageAsyncService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageAsyncService.put(NOTE_KEY, note)
    } else {
        note = _createNote(note.type, note.info.title)
        return storageAsyncService.post(NOTE_KEY, note)
    }
}

function getEmptyNote(type = '', id = '',
    createdAt = 1112222,
    isPinned = true,
    style = { backgroundColor: '#00d' },
    info = { title, txt: 'Fullstack Me Baby!' }) {
    return {
        id, createdAt, type, isPinned, style, info

    }
}


function _createNotes() {
    let notes = storageService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = [
            {
                id: 'n101',
                createdAt: 1112222,
                type: 'NoteTxt',
                isPinned: true,
                style: { backgroundColor: '#00d' },
                info: { title: 'Sprint3', txt: 'Fullstack Me Baby!' }
            },
            {
                id: 'n102',
                type: 'NoteImg',
                isPinned: false,
                info: { url: 'http://some-img/me', title: 'Bobi and Me' },
                style: { backgroundColor: '#00d' }
            },
            {
                id: 'n103',
                type: 'NoteTodos',
                isPinned: false,
                info: {
                    title: 'Get my stuff together',
                    todos: [{ txt: 'Driving license', doneAt: null },
                    { txt: 'Coding power', doneAt: 187111111 }
                    ]
                }
            }
            ]

            }
                storageService.saveToStorage(NOTE_KEY, notes)

                // notes.push(_createNote('Hello', 'NoteTxt'))
                // notes.push(_createNote('Hi', 'NoteTxt'))
                // notes.push(_createNote('Hola', 'NoteTxt'))
            }



    // function _createNote(title, type) {
    //     const note = getEmptyNote(title, type)
    //     note.id = utilService.makeId()
    //     return note
    // }
