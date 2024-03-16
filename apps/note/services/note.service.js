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
    const regex = new RegExp(filterBy.title, 'i')


    return storageAsyncService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.title) {
                notes = notes.filter(note => regex.test(note.info.title))
            }
            if (filterBy.type) {
                notes = notes.filter(note => regex.test(note.type))
            }

            return notes
        })
}

function getDefaultFilter() {
    return {
        title: '' ,
        type: ''
    }
}

function get(noteId) {
    return storageAsyncService.get(NOTE_KEY, noteId)
 
}

function remove(noteId) {
    console.log(noteId)
    return storageAsyncService.remove(NOTE_KEY, noteId)
}

function save(note) {
    console.log('NOTE',note);
    if (note.id) {
        console.log('hi');
        return storageAsyncService.put(NOTE_KEY, note)
    } else {
        // note = _createNote(note.info.title, note.type)
        console.log(note);
        return storageAsyncService.post(NOTE_KEY, note)
    }
}

function saveDuplicateNote(note) {
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
                style: { backgroundColor: '#FFFFFF' },
                info: { title: 'Sprint3', txt: 'Fullstack Me Baby!' }
            },
            {
                id: 'n102',
                type: 'NoteImg',
                isPinned: false,
                info: { url: 'http://some-img/me', title: 'Bobi and Me' },
                style: { backgroundColor: '##FFFFFF' }
            },
            {
                id: 'n103',
                type: 'NoteTodos',
                isPinned: false,
                style: { backgroundColor: '#FFFFFF' },
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

}

function getEmptyNote() {
    return {
        id: '',
        createdAt: Date.now(),
        type: 'NoteTxt',
        isPinned: false,
        style: { backgroundColor: '#FFFFFF' },
        info: { title: '', txt: '' }
    }
}

// function getEmptyNote(title = '', txt = '') {

//     return {
//         id: '',
//         createdAt: new Date(),
//         type: 'NoteTxt',
//         isPinned: false,
//         style: {
//             backgroundColor: '#f6f8fc',
//         },
//         info: {
//             title,
//             txt
//         }
//     }
// }



function _createNote(title, type) {
    console.log('creatnote title ', title);
    const note = getEmptyNote()
    note.info.title = title
    note.type = type
    console.log(note);

    return note
}
