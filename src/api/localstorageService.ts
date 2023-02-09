let blackListKey = 'blackList';
let mainUserKey = 'mainUser';
let repoNameKey = 'repoName';
let reviewerKey = 'reviewer';

let localStorage = window.localStorage;

export function addUserToBlackList(login: string, avatar_url: string) {
    try {
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
    } catch (error) {
        console.log(error);
    }
}

export function removeUserFromBlackList(login: string) {
    try {
        let blackListString = localStorage.getItem(blackListKey);
        if (blackListString !== null) {
            let blackList: Array<{ login: string, avatar_url: string; }> = JSON.parse(blackListString);
            blackList = blackList.filter(item => item.login !== login);
            blackListString = JSON.stringify(blackList);
            localStorage.setItem(blackListKey, blackListString);
        }
    }
    catch (error) {
        console.log(error);
    }
}

export function getAllUsersFromBlackList() {
    let blackList: Array<{ login: string, avatar_url: string; }> = [];
    try {
        let blackListString = localStorage.getItem(blackListKey);
        if (blackListString !== null) {
            blackList = JSON.parse(blackListString);
        }
    }
    catch (error) { console.log(error); }
    return blackList;
}

export function getMainUser() {
    try {
        return localStorage.getItem(mainUserKey);
    } catch (error) {
        console.log(error);
        return '';
    }
}

export function setMainUser(login: string) {
    try {
        localStorage.setItem(mainUserKey, login);
    } catch (error) {
        console.log(error);
    }
}

export function unsetMainUser() {
    try {
        localStorage.removeItem(mainUserKey);
    }
    catch (error) {
        console.log(error);
    }
}

export function getRepo() {
    try {
        return localStorage.getItem(repoNameKey);
    } catch (error) {
        console.log(error);
        return '';
    }
}

export function setRepo(repo: string) {
    try {
        localStorage.setItem(repoNameKey, repo);
    } catch (error) {
        console.log(error);
    }
}

export function unsetRepo() {
    try {
        localStorage.removeItem(repoNameKey);
    } catch (error) {
        console.log(error);
    }
}

export function getReviewer(): { login: string, avatar_url: string; } | null {
    try {
        let temp = localStorage.getItem(reviewerKey);
        if (temp !== null) { return JSON.parse(temp); }
        else return null;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export function setReviewer(login: string, avatar_url: string) {
    try {
        localStorage.setItem(reviewerKey, JSON.stringify({ 'login': login, 'avatar_url': avatar_url }));
    } catch (error) {
        console.log(error);
    }
}

export function removeReviewer() {
    try {
        localStorage.removeItem(reviewerKey);
    }
    catch (error) {
        console.log(error);
    }
}
