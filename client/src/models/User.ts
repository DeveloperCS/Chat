export enum UserType {
    client = 'client',
    admin = 'admin',
    superadmin ='superadmin'
}

export interface BaseUser {
    name: string
    lastname: string
    apodo: string
    sexo: string
    empresa: string
    edad: number
    email: string
    type: UserType
    conflicto: string
    introductionDone: Boolean
    tutorialDone: Boolean
    persona: string
}
export interface JSONUser extends BaseUser {
    id: string
}