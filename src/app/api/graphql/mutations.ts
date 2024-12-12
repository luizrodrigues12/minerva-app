import { gql } from "@apollo/client";

export const TOGGLE_IS_CHECKED = gql`
  mutation toggleIsChecked(
    $token: String!
    $idAluno: String!
    $objMateria: MateriaInput!
  ) {
    toggleIsChecked(token: $token, idAluno: $idAluno, objMateria: $objMateria) {
      idAluno
      nome
      materias {
        _id
        nome
        isChecked
        materia
        ordem
      }
      preparatorio
    }
  }
`;
