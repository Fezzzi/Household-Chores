declare module 'github-api' {
  export interface GithubApiCollaborator {
    login: string
    avatar_url: string
    html_url: string
  }

  export interface GithubApiRepository {
    getCollaborators: () => { data: GithubApiCollaborator[] }
  }

  class GithubApi {
    constructor (options: { username: string; token: string })

    getRepo (owner: string, name: string): GithubApiRepository
  }

  export default GithubApi
}
