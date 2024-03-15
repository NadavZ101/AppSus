
const { Link } = ReactRouterDOM
const { useState, useEffect } = React

import { NoteImg } from "./NoteImg.jsx"

export function NotePreview({ notes, onRemoveNote, duplicateNote, onSetColor, onPinnedNote }) {
    const [noteColor, setNoteColor] = useState({})

    if (!notes.length) return <div>No notes to show</div>
    return <section className="note-container">


        {notes.map(note => (
            <React.Fragment>
               

                {note.isPinned && (
                    <section className='pinned-notes'>
                    </section>
                )}

                <Link key={note.id} to={`/note/edit/${note.id}`}>

                    <div className="note-display" style={{ backgroundColor: note.style.backgroundColor }}>

                        <span className="note-title">{note.info.title}</span>
                        <span className="note-text">{note.info.txt}</span>

                        <div className="actions-btn">
                    <button className="remove-btn note-btn"  onClick={(e) => { e.stopPropagation(); onRemoveNote(note.id) }}><i className="fa-regular fa-trash-can"></i></button>
                    <button className="note-btn" onClick={() => duplicateNote(note.id)}><i className="fa-regular fa-copy"></i></button>
                    <button className="pin-btn" onClick={() => onPinnedNote(note.id)}>  <i className="fa-solid fa-thumbtack"></i>
                    </button>
                    <input
                        type="color"
                        className="note-btn"
                        name="style.backgroundColor"
                        value={noteColor[note.id] || '#FFFFFF'}
                        onChange={(e) => onSetColor(note.id, e.target.value)}
                    />
                    <NoteImg notes={notes}/>
                </div>
                    </div>
                   

                </Link>
            </React.Fragment>


        ))}


    </section >

}
