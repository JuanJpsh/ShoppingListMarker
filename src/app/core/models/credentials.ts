interface CredentialsInterface {
    username: string
    password: string
}

export type Credentials = Pick<CredentialsInterface, 'password' | 'username'>