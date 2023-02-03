

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
            console.log('17' + response);
            return response.json();
        }

        console.log('21' + response);
        const error = {
            status: response.status,
            customError: 'wtfAsync',
        };
        throw error;
    }


    static async getRepoContributors(repo: string) {
    }
}
