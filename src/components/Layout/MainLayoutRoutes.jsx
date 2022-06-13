import React from 'react';
import Navbar from './partials/Navbar.jsx';
import StickyFooter from './partials/StickyFooter.jsx';
import { Routes, Route } from 'react-router-dom';
import CreatePerson from '../Person/CreatePerson.jsx';
import ListPeople from '../Person/ListPeople.jsx';
import ListRegistrations from '../Registration/ListRegistrations.jsx';
import CreateRegistration from '../Registration/CreateRegistration.jsx';
import Dashboard from '../Dashboard.jsx';
import EditPerson from '../Person/EditPerson.jsx';
import { PrivateRoute } from '../private-route/PrivateRoute.jsx';

export default function MainLayoutRoutes() {
    return (
        <>
            <nav>
                <Navbar />
            </nav>
                <Routes>
                    <Route element={<PrivateRoute/>}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/people" element={<ListPeople/>} />
                        <Route path="/registration/create" element={<CreateRegistration/>} />
                        <Route path="/people/create" element={<CreatePerson/>} />
                        <Route path="/people/edit/:id" element={<EditPerson/>} />
                        <Route path="/registrations" element={<ListRegistrations/>} />
                    </Route>
                </Routes>
            <footer>
                <StickyFooter />
            </footer>
        </>
    )
}