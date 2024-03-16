
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


                <div className="note-display" style={{ backgroundColor: note.style.backgroundColor }}>

                    {console.log(note)}
                    <span className="note-title">{note.info.title}</span>
                    <span className="note-text">{note.info.txt}</span>

                    <div className="actions-btn">

                        <button title="delete" className="remove-btn note-btn" onClick={() => { onRemoveNote(note.id) }}>
                            <i className="fa-regular fa-trash-can"></i></button>
                        <button title="copy note " className="note-btn" onClick={() => duplicateNote(note.id)}><i className="fa-regular fa-copy"></i></button>
                        <button title="pin note" className="pin-btn" onClick={() => onPinnedNote(note.id)}>  <i className="fa-solid fa-thumbtack"></i>
                        </button>

                        <Link key={note.id} to={`/note/edit/${note.id}`}> <button title="edit" className="edit-btn">Edit</button>
                            {console.log(note)}   </Link>

                        <input
                            type="color"
                            className="color-input"
                            name="style.backgroundColor"
                            value={noteColor[note.id] || '#FFFFFF'}
                            onChange={(e) => onSetColor(note.id, e.target.value)}
                            title="choose color "
                        />
                        <NoteImg notes={notes} />
                    </div>
                </div>


            </React.Fragment>


        ))}


    </section >

}
