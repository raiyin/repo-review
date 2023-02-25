import { GitHubUser } from "../types";

export interface GitHubRepoObject {
    name: string;
}

export const getUserRepos = async (user: string) => {
    let url = 'https://api.github.com/users/{user}/repos';
    url = url.replace('{user}', user);
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/vnd.github+json'
        },
        redirect: 'follow',
    });

    if (response.ok) {
        let repoArray: Array<GitHubRepoObject> = await response.json();
        let reposNames = repoArray.map(item => item.name);
        return reposNames;
    }

    const error = {
        status: response.status,
        customError: 'wtfAsync',
    };
    throw error;
};

export const getRepoContributors = async (user: string, repo: string) => {
    let url = 'https://api.github.com/repos/{user}/{repo}/contributors';
    url = url.replace('{user}', user);
    url = url.replace('{repo}', repo);
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/vnd.github+json'
        },
        redirect: 'follow',
    });

    if (response.ok) {
        let contribsArray: Array<GitHubUser> = await response.json();
        let contribsNames: Array<GitHubUser> = contribsArray.map(item => ({ login: item.login, avatar_url: item.avatar_url }));
        return contribsNames;
    }

    const error = {
        status: response.status,
        customError: 'wtfAsync',
    };
    throw error;
};
