export interface GitHubUser {
    login: string,
    avatar_url: string;
}

export enum IsPossibleAddToBL {
    Yes = 1,
    NoCurrentUser,
    NoRepeat,
    NoNoexistUser,
    NoEmptyString
}

export interface UserListProps {
    blItems: Array<GitHubUser>;
    remove: Function;
}

export interface BlackListItem {
    blItem: GitHubUser;
    remove: Function;
}
