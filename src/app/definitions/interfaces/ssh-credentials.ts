export interface SshCredentials {
    // Username.
    username: string ;
    // Credentials either password or certificate.
    credentials: { password: string } | {client_certificate: string};
    // IsSudoer indicates if the user has sudo permissions
    is_sudoer: boolean;
}
