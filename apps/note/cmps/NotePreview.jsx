
const { Link } = ReactRouterDOM

export function NotePreview({ notes, onRemoveNote }) {



    if (!notes.length) return <div>No notes to show</div>
    return <section className="note-container">


        {notes.map(note => (
            <Link key={note.id} to={`/note/edit/${note.id}`}>
                <div className="note-display">
                    <span className="note-title">{note.info.title}</span>
                    <button className="remove-btn" onClick={() => onRemoveNote(note.id)}>X</button>
                    <span>{note.info.txt}</span>
                </div>
            </Link>
        ))}


    </section >

}