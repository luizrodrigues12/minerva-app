import { gql } from "@apollo/client";

export const GET_ALL_STUDENTS = gql`
  query ($token: String!) {
    alunos(token: $token) {
      idAluno
      nome
    }
  }
`;

export const GET_ONE_STUDENT = gql`
  query Aluno($idAluno: String!, $token: String!) {
    aluno(idAluno: $idAluno, token: $token) {
      idAluno
      nome
      preparatorio
      materias {
        _id
        isChecked
        materia
        nome
        ordem
      }
    }
  }
`;
