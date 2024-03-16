const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM
const { useNavigate, useParams } = ReactRouter


import { noteService } from "../services/note.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { utilService } from "../../../services/util.service.js"

import { NotePreview } from "../cmps/NotePreview.jsx"
import { NoteFilter } from "../cmps/NoteFilter.jsx"
import { NoteEdit } from "../cmps/NoteEdit.jsx"

export function NoteIndex() {
    // const [searchParams, setSearchParams] = useSearchParams()

    const [notes, setNotes] = useState(null)
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())
    const navigate = useNavigate()


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
        console.log(noteId);
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

    function duplicateNote(noteId) {
        const noteToDuplicate = notes.find(note => note.id === noteId);
        if (!noteToDuplicate) return;
    
        const newNote = {
            ...noteToDuplicate,
            id: '',
        };
    
        noteService.save(newNote)
            .then(savedDuplicateNote => {

                setNotes(prevNotes => [savedDuplicateNote,...prevNotes])
    
                navigate('/note')
                showSuccessMsg('Note saved successfully')
            })
            .catch(err => {
                console.error('Had issues saving note', err)
                showErrorMsg('Could not save note')
            })
    }

    function onPinnedNote(noteId) {
        const noteToPin = notes.find(note => note.id === noteId)

        noteToPin.isPinned = !noteToPin.isPinned

        const filteredNotes = notes.filter(note => note.id !== noteId)

        const updatedNotes = noteToPin.isPinned ? [noteToPin, ...filteredNotes] : [...filteredNotes, noteToPin]

        setNotes(updatedNotes)
    }


    function onSetColor(noteId, color) {
        console.log(color)
        console.log(noteId)

        const updatedNote = notes.find(note => note.id === noteId)

        if (updatedNote) {
            updatedNote.style = { ...updatedNote.style, backgroundColor: color }

            noteService.save(updatedNote)
                .then(savedNoteColor => {
                    setNotes(prevNotes => prevNotes.map(note => note.id === noteId ? savedNoteColor : note))
                    console.log('Updated note:', savedNoteColor)
                })
                .catch(error => {
                    console.error('Error saving color:', error)
                })
        }
    }

    const { title, type } = filterBy
    console.log(filterBy);
    if (!notes) return <div>loading...</div>

    return <section className="note-index">
        <NoteFilter
            onSetFilter={onSetFilter}
            filterBy={{ title, type }} />
        <div>
            <Link to="/note/edit"><button className="add-btn"><i class="fa-regular fa-pen-to-square"></i>
            </button></Link>
            <NoteEdit /> 
            </div>


        <NotePreview
            notes={notes}
            onRemoveNote={onRemoveNote}
            duplicateNote={duplicateNote}
            onSetColor={onSetColor}
            onPinnedNote={onPinnedNote}
        // onUpdateNote={onUpdateNote}
        />



    </section>
}
