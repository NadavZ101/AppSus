const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/AppHeader.jsx"

import { About } from "./views/About.jsx"
import { Home } from "./views/Home.jsx"

import { MailIndex } from "./apps/mail/views/MailIndex.jsx"
import { MailDetails } from "./apps/mail/views/MailDetails.jsx"

import { NoteIndex } from "./apps/note/views/NoteIndex.jsx"
import { NoteEdit } from "./apps/note/cmps/NoteEdit.jsx"



export function App() {
    return <Router>
        <section className="app">
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                {/* <Route path="/mail" element={<MailNavBar />} /> */}
                <Route path="/mail/:mailId" element={<MailDetails />} />
                <Route path="/mail" element={<MailIndex />} >
                    {/* <Route path="/mail/list" element={<MailList />} /> */}
                </Route >
                <Route path="/note" element={<NoteIndex />} />
                <Route path="/note/edit" element={<NoteEdit />} />
                <Route path="/note/edit/:noteId" element={<NoteEdit />} />
            </Routes>
        </section>
    </Router>
}
