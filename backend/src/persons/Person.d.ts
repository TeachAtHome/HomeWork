export const enum PersonRole { 'TEACHER', 'STUDENT', 'PARENT' }

export interface Person {
    id: string | undefined
    firstname: string
    lastname: string
    email: string
    sick: boolean
    role: PersonRole | undefined
}