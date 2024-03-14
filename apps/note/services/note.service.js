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
    saveDuplicateNote,
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
    return { 
        info: { title: '' },
        type: '' 
    }
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
        console.log(note);
        note = _createNote(note.info.title,note.type)
        return storageAsyncService.post(NOTE_KEY, note)
    }
}

function saveDuplicateNote(note){
    console.log(note)

    return storageAsyncService.post(NOTE_KEY, note)

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
                style: { backgroundColor: '#00d' },
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

function getEmptyNote(){
    const timestamp = Date.now()
    return {
        createdAt: timestamp,
        type: '',
        isPinned: false,
        style: { backgroundColor: '#00d' },
        info: { title: '', txt: '' }
    }
}

function _createNote(title, type) {
    console.log('creatnote title ', title);
    const note = getEmptyNote()
    note.id = utilService.makeId()
    note.info.title = title
    note.type=type
    console.log(note );

    return note
}
