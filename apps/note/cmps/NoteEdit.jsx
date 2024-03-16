const { useState, useEffect, useRef } = React
const { useNavigate, useParams } = ReactRouter


import { noteService } from "../services/note.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

export function NoteEdit() {
    const [noteToEdit, setNoteToEdit] = useState(noteService.getDefaultFilter())
    const navigate = useNavigate()
    const { noteId } = useParams()
    // const inputRef = useRef()

    useEffect(() => {
        // inputRef.current.focus()
        if (noteId) loadNote()
    }, [])

    function loadNote() {
        console.log('hello');

        noteService.get(noteId)
            .then(note => setNoteToEdit(note))
            .catch(err => {
                console.error('Had issues loading note', err)

            })
    }

    function onSaveNote(ev) {
        ev.preventDefault()

        noteService.save(noteToEdit)
            .then(savedNote => {
                navigate('/note')
                showSuccessMsg('note saved successfully')
            })
            .catch(err => {
                console.error('Had issues saving note', err)
                showErrorMsg('could not save note')
            })

    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        console.log(value);

        if (field === 'title') {
            const info = { ...noteToEdit.title, [field]: value }
            setNoteToEdit(prevNoteToEdit => ({ ...prevNoteToEdit, info }))
            return
        }


        setNoteToEdit(prevNoteToEdit => ({ ...prevNoteToEdit, [field]: value }))
    }
   console.log(noteToEdit);
    const { title, type } = noteToEdit
    // const {title}= info
    console.log(title);



    return (

        <section className="note-edit">
            {/* <button onClick={() => setShowModal(true)}>Open Modal</button> */}

            {/* {showModal && ( */}
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
                        value={title}
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
            {/* )} */}
        </section>
    )


}

