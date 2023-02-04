
interface GitHubRepoObject {
    name: string;
}

export default class GithubService {
    static async getUserRepos(user: string) {
        let url = 'https://api.github.com/users/{user}/repos';
        url = url.replace('{user}', user);
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
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


    static async getRepoContributors(repo: string) {
    }
}
