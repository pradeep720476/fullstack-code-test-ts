import axios from 'axios';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import UsersPage from './UsersPage';
import { render, screen } from '@testing-library/react';
import React from 'react';

jest.mock('axios'); // Mock the entire Axios library

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('UsersPage Component', () => {
  let store;

  const initialState = {
    users: {
      users: [],
      page: 1,
      loading: false,
      hasMore: true,
    },
  };

  beforeEach(() => {
    // Mock axios.create() to prevent Axios from making real HTTP calls
    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn(), // Mock axios.get() method
    });

    store = mockStore(initialState);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Ensure all mocks are cleared after each test
  });

  test.only('displays user cards when users are present', () => {
    const updatedState = {
      ...initialState,
      users: {
        users: [
          { id: 1, name: 'John Doe' },
          { id: 2, name: 'Jane Doe' },
        ],
        page: 1,
        loading: false,
        hasMore: true,
      },
    };

    store = mockStore(updatedState);

    render(
      <Provider store={store}>
        <UsersPage />
      </Provider>
    );

    // Since UserCard is mocked, you can test that the mocked content is rendered
    expect(screen.getAllByText('UserCard')).toHaveLength(2);
  });
});
