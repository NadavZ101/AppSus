const { useState, useEffect } = React


export function NoteFilter({ onSetFilter, filterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function onFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    function handleChange({ target }) {

        let { value, name: field, type } = target


        setFilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, [field]: value }))
    }


    return <section className="note-filter">

        <form onSubmit={onFilter}>
            <label htmlFor="title"></label>
            <input type="text"
                id="title"
                name="title"
                value={filterByToEdit.title}
                onChange={handleChange}
                placeholder="Search" />

            {/* <label htmlFor="type"></label>
            <input type="text"
                id="type"
                name="type"
                value={filterByToEdit.type}
                onChange={handleChange}
                placeholder=" note type" /> */}

            {/* <button>Search</button> */}
        </form>
    </section>
}


