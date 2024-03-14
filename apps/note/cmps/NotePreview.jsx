
const { Link } = ReactRouterDOM

export function NotePreview({ notes, onRemoveNote }) {



    if (!notes.length) return <div>No notes to show</div>
    return <section className="note-container">


        {notes.map(note => (
            <React.Fragment>
                <button className="remove-btn" onClick={() => onRemoveNote(note.id)}>X</button>

                <Link key={note.id} to={`/note/edit/${note.id}`}>
                    <div className="note-display">
                        <span className="note-title">{note.info.title}</span>
                        <span className="note-text">{note.info.txt}</span>
                    </div>
                </Link>
            </React.Fragment>


        ))}


    </section >

}