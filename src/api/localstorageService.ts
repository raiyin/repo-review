let blackListKey = 'blackList';
let mainUserKey = 'mainUser';
let repoNameKey = 'repoName';
let reviewerKey = 'reviewer';

let localStorage = window.localStorage;
// add try/catch

export function addUserToBlackList(login: string, avatar_url: string) {

    let blackListString = localStorage.getItem(blackListKey);
    if (blackListString !== null) {
        let blackList: Array<{ login: string, avatar_url: string; }> = JSON.parse(blackListString);
        blackList.push({ 'login': login, 'avatar_url': avatar_url });
        blackListString = JSON.stringify(blackList);
        localStorage.setItem(blackListKey, blackListString);
    }
    else {
        let blackList: Array<{ login: string, avatar_url: string; }> = [];
        blackList.push({ login: login, avatar_url: avatar_url });
        blackListString = JSON.stringify(blackList);
        localStorage.setItem(blackListKey, blackListString);
    }
}

export function removeUserFromBlackList(login: string) {
    let blackListString = localStorage.getItem(blackListKey);
    if (blackListString !== null) {
        let blackList: Array<{ login: string, avatar_url: string; }> = JSON.parse(blackListString);
        blackList = blackList.filter(item => item.login !== login);
        blackListString = JSON.stringify(blackList);
        localStorage.setItem(blackListKey, blackListString);
    }
}

export function getAllUsersFromBlackList() {

    let blackListString = localStorage.getItem(blackListKey);
    let blackList: Array<{ login: string, avatar_url: string; }> = [];
    if (blackListString !== null) {
        blackList = JSON.parse(blackListString);
    }
    return blackList;
}

export function getMainUser() {
    return localStorage.getItem(mainUserKey);
}

export function setMainUser(login: string) {
    localStorage.setItem(mainUserKey, login);
}

export function unsetMainUser() {
    localStorage.removeItem(mainUserKey);
}

export function getRepo() {
    return localStorage.getItem(repoNameKey);
}

export function setRepo(repo: string) {
    localStorage.setItem(repoNameKey, repo);
}

export function unsetRepo() {
    localStorage.removeItem(repoNameKey);
}

export function getReviewer(): { login: string, avatar_url: string; } | null {
    let temp = localStorage.getItem(reviewerKey);
    if (temp !== null) { return JSON.parse(temp); }
    else return null;
}

export function setReviewer(login: string, avatar_url: string) {
    localStorage.setItem(reviewerKey, JSON.stringify({ 'login': login, 'avatar_url': avatar_url }));
}

export function removeReviewer() {
    localStorage.removeItem(reviewerKey);
}
