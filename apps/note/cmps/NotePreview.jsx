
const { Link } = ReactRouterDOM
const { useState, useEffect } = React
import { utilService } from "../../../services/util.service.js"
import { noteService } from "../services/note.service.js"

export function NotePreview({ notes, onRemoveNote,duplicateNote }) {
    const [noteColor, setNoteColor] = useState({})
    const [notesState, setNotesState] = useState(notes)

    function onSetColor(noteId, color) {
        setNoteColor(prevColor => ({
            ...prevColor,
            [noteId]: color
        }))
    }

    

    if (!notes.length) return <div>No notes to show</div>
    return <section className="note-container">


        {notes.map(note => (
            <React.Fragment>
                   <button className="remove-btn note-btn" onClick={() =>{console.log(note.id); onRemoveNote(note.id)}}>X</button>
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