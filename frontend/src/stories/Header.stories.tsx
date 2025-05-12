import React from 'react';
import {MemoryRouter} from "react-router-dom";
import Header from "../components/Header";

export default {
    title: 'Components/Headers/Header',
    component: Header,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <MemoryRouter>
                <Story/>
            </MemoryRouter>
        )
    ],
    parameters: {
        layout: 'fullscreen',
    }


}

export const Default = () => <Header/>