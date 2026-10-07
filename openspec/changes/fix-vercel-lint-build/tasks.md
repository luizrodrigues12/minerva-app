# Tasks

## 1. Corrigir `String` → `string` (`@typescript-eslint/no-wrapper-object-types`)

- [x] 1.1 Em `src/actions/idToSubjects.ts:5`, trocar `checkeds: Array<String>` por `checkeds: Array<string>`; verificar que não há mais `Array<String>` no arquivo.
- [x] 1.2 Em `src/models/userModel.ts:24`, trocar `preparatorio?: Array<String>` por `Array<string>`, mantendo `type: String` e `type: [String]` do schema Mongoose intactos; verificar que as ocorrências de `String` restantes são apenas as do Mongoose.
- [x] 1.3 Em `src/components/student/update_student/UpdateStudentForm.tsx:18`, trocar `useState(Array<String>)` por `useState<string[]>([])`, preservando o estado inicial vazio; verificar que a linha não usa mais `String` como tipo.

## 2. Corrigir `prefer-const`

- [x] 2.1 Em `src/components/planning/add-planning/AddPlanningSubjects.tsx:42`, trocar `let allSubjects` por `const allSubjects`; verificar que o arquivo não tem mais `let allSubjects`.
- [x] 2.2 Em `src/components/planning/edit-planning/[idAluno]/EditPlanningForm.tsx:109`, trocar `let allSubjects` por `const allSubjects`; verificar que o arquivo não tem mais `let allSubjects`.
- [x] 2.3 Em `src/components/student/update_student/SubjectUpdateForm.tsx:45`, trocar `let arr` por `const arr`; verificar que `arr` continua sendo preenchido por `.push()` e o arquivo não tem mais `let arr`.
- [x] 2.4 Em `src/utils/months.ts:172,175,180`, trocar `let portuguesSubjects`, `let matematicaSubjects` e `let totalSubjects` por `const`; verificar que `subjectIndex`, `portuguesIndex` e `matematicaIndex` continuam `let` (são reatribuídos).

## 3. Corrigir ternário-como-statement (`@typescript-eslint/no-unused-expressions`)

- [x] 3.1 Em `src/components/login/LoginForm.tsx:49-51`, converter o ternário `...includes("senha") ? setpasswordError(...) : setEmailError(...)` em `if/else`; verificar que a regra não é mais reportada no arquivo e que os dois caminhos chamam as mesmas funções.
- [x] 3.2 Em `src/components/register/RegisterForm.tsx:67-69`, converter o ternário `...includes("nome") ? setNameError(...) : setEmailError(...)` em `if/else`; verificar equivalência dos dois caminhos.
- [x] 3.3 Em `src/components/profile/change_email/ChangeEmailPage.tsx:31`, converter `success ? setMessage(success) : setError(error)` em `if/else`; verificar que ambos os estados continuam sendo atualizados nas mesmas condições.
- [x] 3.4 Em `src/contexts/darkMode.tsx:33-35`, converter o ternário de `localStorage.setItem` em `if/else`; verificar que `theme` alterna entre `"light"` e `"dark"` como antes.

## 4. Corrigir `children` como prop (`react/no-children-prop`)

- [x] 4.1 Em `src/components/profile/UserDataComp.tsx:90,97,102,108`, aninhar os filhos (`VerifyEmailForm`, `ChangeEmailForm`, `ChangePasswordForm`, `DeleteAccount`) entre as tags do `Accordion` no lugar da prop `children={<X/>}`; verificar que os 4 componentes continuam sendo renderizados dentro do respectivo `Accordion`.

## 5. Corrigir entidades não escapadas (`react/no-unescaped-entities`)

- [x] 5.1 Em `src/components/terms-of-use/TermsOfUse.tsx:61`, substituir `'espelhar'` por `&apos;espelhar&apos;`; verificar que a regra não é mais reportada para a linha e o texto renderiza o mesmo apóstrofo.
- [x] 5.2 Em `src/components/terms-of-use/TermsOfUse.tsx:80`, substituir `"como estão"` por `&quot;como estão&quot;`; verificar que a regra não é mais reportada para a linha e o texto renderiza as mesmas aspas.

## 6. Verificação de integração

- [x] 6.1 Rodar `npx next lint` e confirmar **zero erros** (warnings de `react-hooks/exhaustive-deps` e `<img>` podem permanecer).
- [x] 6.2 Rodar `npx next build` e confirmar que a compilação conclui sem falha de compilação nem erro de ESLint.
