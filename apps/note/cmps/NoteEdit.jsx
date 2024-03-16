const { useState, useEffect, useRef } = React
const { useNavigate, useParams } = ReactRouter


import { noteService } from "../services/note.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

export function NoteEdit({notes}) {
    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
    const [newNote, setNewNote] = useState(null)
    const navigate = useNavigate()
    const { noteId } = useParams()
    // const inputRef = useRef()

    useEffect(() => {
        // inputRef.current.focus()
        if (noteId) loadNote()
    }, [])

    function loadNote() {

        noteService.get(noteId)
            .then(note => setNoteToEdit(note))
            .catch(err => {
                console.error('Had issues loading note', err)

            })
    }

    function onSaveNote(ev) {
        ev.preventDefault();
    
        noteService.save(noteToEdit)
            .then(savedNote => {
                setNewNote(savedNote)
                console.log('Updated noteToEdit:', noteToEdit);
                navigate('/note');
                showSuccessMsg('Note saved successfully');
            })
            .catch(err => {
                console.error('Had issues saving note', err);
                showErrorMsg('Could not save note');
            });
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        if (field === 'title') {
              setNoteToEdit((prevNote) => ({ ...prevNote, info: { title:value } }))
            return
        }


        setNoteToEdit(prevNoteToEdit => ({ ...prevNoteToEdit, [field]: value }))
    }
   console.log(noteToEdit);
    const { info, type } = noteToEdit
    // const {title}= info
    console.log(info);



    return (

        <section className="note-edit">

                <form onSubmit={onSaveNote} >
                    {/* <dialog className="note-modal" method="dialog"> */}
                    <label htmlFor="title"></label>
                    <input
                        type="text"
                        id="title"
                        placeholder="New note..."
                        className="txt-input"
                        // ref={inputRef}

                        name="title"
                        onChange={handleChange}
                        value={info.title}
                    />

                    {/* <label htmlFor="type">Note type:</label>
                    <input
                        type="text"
                        id="type"
                        placeholder="Enter note type"

                        name="type"
                        onChange={handleChange}
                        value={type}
                    /> */}

                    <button>Save</button>
                    {/* <button onClick={() => setShowModal(false)}>Close</button> */}
                    {/* </dialog> */}
                </form>
        </section>
    )


}

