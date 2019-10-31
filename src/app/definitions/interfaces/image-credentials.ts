// ImageCredentials contains the credentials to pull the image
export interface ImageCredentials {
    // Name of the user in the platform
    username?: string;
    // Password
    password?: string;
    // User email
    email?: string;
    // Docker repository url
    docker_repository?: string;
}
