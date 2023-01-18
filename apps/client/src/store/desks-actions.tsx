import { desksActions } from './desks';
import { gql } from '@apollo/client';
import { client } from '../ApolloClient/client';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';

const GET_DESKS = gql`
  query getDesks {
    desks {
      id
      name
      description
      order
    }
  }
`;

const CREATE_DESK = gql`
  mutation CreateDesk($name: String!, $description: String!, $order: Float!) {
    createDesk(name: $name, description: $description, order: $order) {
      id
      name
      description
      order
    }
  }
`;

const REMOVE_DESK = gql`
  mutation RemoveDesk($id: Float!) {
    removeDesk(id: $id)
  }
`;

export const fetchDesks = () => {
  return async (dispatch: Dispatch<AnyAction>) => {
    const fetchDesksQuery = async () => {
      const response = await client.query({
        query: GET_DESKS,
      });

      return response.data.desks;
    };

    try {
      const desks = await fetchDesksQuery();

      dispatch(desksActions.replaceItems(desks));
    } catch (e) {
      console.log('ERROR');
    }
  };
};

export const addDesk = (name: string, description: string, order: number) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    const addDeskMutation = async () => {
      const response = await client.mutate({
        mutation: CREATE_DESK,
        variables: {
          name,
          description,
          order,
        },
      });

      return response.data.createDesk;
    };

    try {
      const newDesk = await addDeskMutation();
      dispatch(desksActions.addItem(newDesk));
    } catch (e) {
      console.log('ERROR');
    }
  };
};

export const removeDesk = (id: number) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    const removeDeskMutation = async () => {
      const response = await client.mutate({
        mutation: REMOVE_DESK,
        variables: {
          id,
        },
      });

      return response.data.removeDesk;
    };

    try {
      const isRemoved = await removeDeskMutation();

      if (isRemoved) {
        dispatch(desksActions.removeItem(id));
      }
    } catch (e: any) {
      console.log(e.message);
    }
  };
};
