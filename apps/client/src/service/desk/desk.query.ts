import { gql } from "@apollo/client";

export const GET = gql`
  query getDesks {
    desks {
      id
      name
      description
      order
    }
  }
`;

export const CREATE = gql`
  mutation CreateDesk($name: String!, $description: String!, $order: Float!) {
    createDesk(name: $name, description: $description, order: $order) {
      id
      name
      description
      order
    }
  }
`;

export const REMOVE = gql`
  mutation RemoveDesk($id: Float!) {
    removeDesk(id: $id)
  }
`;
