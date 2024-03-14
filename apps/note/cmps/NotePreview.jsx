
const { Link } = ReactRouterDOM
const { useState, useEffect } = React
import { utilService } from "../../../services/util.service.js"
import { noteService } from "../services/note.service.js"

export function NotePreview({ notes, onRemoveNote }) {
    const [noteColor, setNoteColor] = useState({})
    const [notesState, setNotesState] = useState(notes)

    function onSetColor(noteId, color) {
        setNoteColor(prevColor => ({
            ...prevColor,
            [noteId]: color
        }))
    }

    // useEffect (()=>{
    //     loadNotes()

    // },[notesState])

    // function loadNotes() {
    //     noteService.query()
    //         .then((notes) => {
    //             setNotes(notes)
    //         })
    // }

    function duplicateNote(noteId) {
        const noteToDuplicate = notes.find(note => note.id === noteId)
        if (!noteToDuplicate) return

        const newNote = {
            ...noteToDuplicate,
            id: '',
        }

        console.log('Before state update:', notesState)

        noteService.save(newNote)
        .then(savedDuplicateNote => {
            setNotesState(prevNotes => [...prevNotes, newNote])
            console.log('After state update:', notesState)


            console.log(savedDuplicateNote)
            navigate('/note')
            showSuccessMsg('note saved successfully')
        })
        .catch(err => {
            console.error('Had issues saving note', err)
            showErrorMsg('could not save note')
        })
    }


    if (!notes.length) return <div>No notes to show</div>
    return <section className="note-container">


        {notes.map(note => (
            <React.Fragment>
                   <button className="remove-btn note-btn" onClick={() => onRemoveNote(note.id)}>X</button>
                <button className="note-btn" onClick={() => duplicateNote(note.id)}>Duplicate</button>
                <input
                    type="color"
                    className="note-btn"
                    name="style.backgroundColor"
                    value={noteColor[note.id] || '#FFFFFF'}
                    onChange={(e) => onSetColor(note.id, e.target.value)}
                />

                <Link key={note.id} to={`/note/edit/${note.id}`}>
                    
                    <div className="note-display" style={{ backgroundColor: noteColor[note.id] || '#FFFFFF' }}>
               
                        <span className="note-title">{note.info.title}</span>
                        <span className="note-text">{note.info.txt}</span>
                    </div>
                
                </Link>
            </React.Fragment>


        ))}


    </section >

}