import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest } from "next/server";
import { gql } from "graphql-tag";
import { getAllStudents, getOneStudent, toggleIsChecked } from "./providers";
import { MateriaType } from "@/models/MateriasModel";

const typeDefs = gql`
  type Materia {
    _id: String
    nome: String
    isChecked: Boolean
    materia: String
    ordem: Int
  }

  input MateriaInput {
    _id: ID
    nome: String
    isChecked: Boolean
    materia: String
    ordem: Int
  }

  type Aluno {
    idAluno: String
    nome: String
    preparatorio: [String]
    materias: [Materia]
  }

  type Query {
    alunos(token: String!): [Aluno]
    aluno(idAluno: String!, token: String!): Aluno
  }

  type Mutation {
    toggleIsChecked(
      objMateria: MateriaInput!
      token: String!
      idAluno: String!
    ): Aluno
  }
`;

const resolvers = {
  Query: {
    alunos: (_: any, args: any) => getAllStudents(args.token),
    aluno: (_: any, args: any) => getOneStudent(args.token, args.idAluno),
  },

  Mutation: {
    toggleIsChecked: (_: any, args: any) =>
      toggleIsChecked(args.token, args.idAluno, args.objMateria),
  },
};

const server = new ApolloServer({ resolvers, typeDefs });

const handler = startServerAndCreateNextHandler<NextRequest>(server);

export { handler as GET, handler as POST };
