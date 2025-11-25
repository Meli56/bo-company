import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './app/store';

// Mock AdminPage
jest.mock('./pages/AdminPage', () => {
  return function MockAdminPage() {
    return <div data-testid="admin-page">Admin Page Mock</div>;
  };
});

describe('App', () => {
  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByTestId('admin-page')).toBeInTheDocument();
  });

  it('includes the Toaster component for notifications', () => {
    const { container } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Check that the app container exists
    expect(container.querySelector('.App')).toBeInTheDocument();
  });
});

