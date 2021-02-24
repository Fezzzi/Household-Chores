// @ts-ignore
import GitHub from 'github-api'

const GITHUB_REPO = 'Household-Chores'
const GITHUB_REPO_OWNER = 'Fezzzi'

interface GithubCollaborator {
  login: string
  avatar_url: string
  html_url: string
}

interface Contributor {
  name: string
  photo: string
  link: string
}

/**
 * Returns list of contributors from github
 */
export const findContributors = async (): Promise<Contributor[]> => {
  const github = new GitHub({
    username: process.env.GITHUB_USERNAME,
    token: process.env.GITHUB_TOKEN,
  })

  const repo = github.getRepo(GITHUB_REPO_OWNER, GITHUB_REPO)

  const collaborators: { data: GithubCollaborator[] } = await repo.getCollaborators()
  return collaborators.data.map(({ login, avatar_url, html_url }) => ({
    name: login,
    photo: avatar_url,
    link: html_url,
  }))
}

/**
 * Returns list of backers from patreon
 */
export const findSupporters = async (): Promise<[]> => []
