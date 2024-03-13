const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

import { noteService } from "../services/note.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

import { NotePreview } from "../cmps/NotePreview.jsx"

export function NoteIndex() {
    // const [searchParams, setSearchParams] = useSearchParams()

    const [notes, setNotes] = useState(null)
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())

    useEffect(() => {
        loadNotes()

    }, [filterBy])

    function onSetFilter(fieldsToUpdate) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...fieldsToUpdate }))
    }

    function loadNotes() {
        noteService.query(filterBy)
            .then((notes) => {
                setNotes(notes)
            })
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                setNotes((prevNotes) => prevNotes.filter(note => note.id !== noteId))
                showSuccessMsg(`Note removed successfully (${noteId})`)

            })
            .catch((err) => {
                console.error('Had issues removing note', err)
                showErrorMsg(`note had not removed (${noteId})`)

            })
    }






    if (!notes) return <div>loading...</div>

    return <section>
        <div>note app</div>
        <Link to="/note/edit"><button>Add a Note</button></Link>

        <NotePreview
            notes={notes}
            onRemoveNote={onRemoveNote}
        // onUpdateNote={onUpdateNote}
        />
    </section>
}
