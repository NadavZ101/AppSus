const { useState, useEffect } = React

export function MailFilter({ onSetFilter, filterBy }) {
    console.log(filterBy)

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    console.log(filterByToEdit)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function onFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    function handleChange({ target }) {
        let { value, name: field, type } = target

        const fieldValue = type === 'checkbox' ? checked : value
        console.log('fieldValue', fieldValue)

        setFilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, [field]: fieldValue }))
    }

    return <section className="mail-filter">
        <form onSubmit={onFilter}>
            <input type="text"
                id="subject"
                name="subject"
                onChange={handleChange}
                value={filterByToEdit.subject}
                placeholder="Search in Email"
            />
            <input type="checkbox"
                id="mailReadingStatus"
                name="mailReadingStatus"
                onChange={handleChange}
                value={filterByToEdit.mailReadingStatus}
                placeholder="Search in Email"
            />
        </form>
    </section>
}