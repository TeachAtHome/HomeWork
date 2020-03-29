export const enum PersonRole { 'TEACHER', 'STUDENT', 'PARENT' }

export interface Person {
    _id: string | undefined
    firstname: string
    lastname: string
    email: string
    sick: boolean
    role: PersonRole | undefined
}