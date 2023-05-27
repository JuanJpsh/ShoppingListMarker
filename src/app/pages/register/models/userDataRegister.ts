interface UserDataRegisterInterface {
    id: number
    fullname: string
    username: string
    password: string
}

export type UserDataRegister = Pick<UserDataRegisterInterface, 'fullname' | 'username' | 'password'>
export type UserDataRegisterResponse = Pick<UserDataRegisterInterface, 'id' | 'fullname' | 'username' | 'password'>