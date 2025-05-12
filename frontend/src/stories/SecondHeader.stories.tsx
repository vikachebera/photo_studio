import React from 'react';
import SecondHeader from '../components/SecondHeader';
import { MemoryRouter } from 'react-router-dom';

export default {
  title: 'Components/Headers/SecondHeader',
  component: SecondHeader,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
        <MemoryRouter>
            <Story />
        </MemoryRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export const Default = () => <SecondHeader />;