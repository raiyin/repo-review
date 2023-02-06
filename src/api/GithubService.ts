
interface GitHubRepoObject {
    name: string;
}

interface GitHubContribObject {
    login: string;
}

export default class GithubService {

    static async getUserRepos(user: string) {
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
    }


    static async getRepoContributors(user: string, repo: string) {
        let url = 'https://api.github.com/repos/{user}/{repo}/contributors';
        url = url.replace('{user}', user);
        url = url.replace('{repo}', repo);
        console.log(url);
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/vnd.github+json'
            },
            redirect: 'follow',
        });

        if (response.ok) {
            let contribsArray: Array<GitHubContribObject> = await response.json();
            console.log('contribsArray' + contribsArray);
            let contribsNames = contribsArray.map(item => item.login);
            console.log('contribsArray' + contribsNames);
            return contribsNames;
        }

        const error = {
            status: response.status,
            customError: 'wtfAsync',
        };
        throw error;
    }
}
