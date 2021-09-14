import GitHub from 'github-api'

import { CONFIG } from 'serverSrc/constants'

const GITHUB_REPO = 'Household-Chores'
const GITHUB_REPO_OWNER = 'Fezzzi'

interface Contributor {
  name: string
  photo: string
  link: string
}

/**
 * Returns list of contributors from github
 */
export const findContributors = async (): Promise<Contributor[]> => {
  if (!CONFIG.GITHUB_USERNAME || !CONFIG.GITHUB_TOKEN) {
    return []
  }

  const github = new GitHub({
    username: CONFIG.GITHUB_USERNAME,
    token: CONFIG.GITHUB_TOKEN,
  })

  const repo = github.getRepo(GITHUB_REPO_OWNER, GITHUB_REPO)

  const { data } = await repo.getCollaborators()
  return data.map(({ login, avatar_url, html_url }) => ({
    name: login,
    photo: avatar_url,
    link: html_url,
  }))
}

/**
 * Returns list of backers from patreon
 */
export const findSupporters = async (): Promise<[]> => []
