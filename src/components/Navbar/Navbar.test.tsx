import { act, render, screen } from '@testing-library/react';
import Navbar from './Navbar';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import '@testing-library/jest-dom'

describe('Navbar', () => {
  it('should render the logo', async () => {
    await act(async () => {
        render(<UserProvider><Navbar /></UserProvider>);
    });
    // search for the logo element
    const logoElement = screen.getByText('To Do List App');
    expect(logoElement).toBeInTheDocument();
  });

  it('should render navigation links', async () => {
    await act(async () => {
        render(<UserProvider><Navbar /></UserProvider>);
    });
    // search for the navigation links
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });
});
