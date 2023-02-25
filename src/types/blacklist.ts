import { GitHubUser } from '../types';

export interface BlackListState {
    blacklisters: GitHubUser[];
}

export enum BlacklistActionTypes {
    ADD_BLACKLIST_ITEM = 'ADD_BLACKLIST_ITEM',
    REMOVE_BLACKLIST_ITEM = 'REMOVE_BLACKLIST_ITEM',
}

interface AddBlacklistItemAction {
    type: BlacklistActionTypes.ADD_BLACKLIST_ITEM;
    payload: GitHubUser;
}

interface RemoveBlacklistItemAction {
    type: BlacklistActionTypes.REMOVE_BLACKLIST_ITEM;
    payload: GitHubUser;
}


export type BlacklistAction = AddBlacklistItemAction | RemoveBlacklistItemAction;
