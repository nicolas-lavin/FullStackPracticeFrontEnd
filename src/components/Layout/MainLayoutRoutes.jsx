import React from 'react';
import Navbar from './partials/Navbar.jsx';
import StickyFooter from './partials/StickyFooter.jsx';
import { Routes, Route } from 'react-router-dom';
import NotFound from '../Errors/404.jsx';
import CreatePerson from '../Person/CreatePerson.jsx';
import ListPeople from '../Person/ListPeople.jsx';
import ListRegistrations from '../Registration/ListRegistrations.jsx';
import CreateRegistration from '../Registration/CreateRegistration.jsx';
import Home from '../Home.jsx';
import EditPerson from '../Person/EditPerson.jsx';

export default function MainLayoutRoutes() {
    return (
        <>
            <nav>
                <Navbar />
            </nav>
                <Routes>
                    <Route index element={<Home />} />
                    <Route exact path="/registration/create" element={<CreateRegistration/>}/>
                    <Route exact path="/people" element={<ListPeople/>} />
                    <Route exact path="/people/create" element={<CreatePerson/>} />
                    <Route exact path="/people/edit/:id" element={<EditPerson/>} />
                    <Route exact path="/registrations" element={<ListRegistrations/>} />
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            <footer>
                <StickyFooter />
            </footer>
        </>
    )
}