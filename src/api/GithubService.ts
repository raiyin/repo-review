
interface GitHubStringObject {
    name: string;
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
            let repoArray: Array<GitHubStringObject> = await response.json();
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
        let url = 'https://api.github.com/{user}/{repo}/contributors';
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
            let contribsArray: Array<GitHubStringObject> = await response.json();
            let contribsNames = contribsArray.map(item => item.name);
            return contribsNames;
        }

        const error = {
            status: response.status,
            customError: 'wtfAsync',
        };
        throw error;
    }
}
