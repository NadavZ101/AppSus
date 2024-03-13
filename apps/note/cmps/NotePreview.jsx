

export function NotePreview({ notes, onRemoveNote }) {




    if (!notes.length) return <div>No notes to show</div>
    return <section className="note-container">

        {
            notes.map(note => <div key={note.id} className="note-display">

                <span className="note-title">{note.info.title}</span>
                <span>{note.info.txt}</span>

            </div>

            )
        }

    </section>

}