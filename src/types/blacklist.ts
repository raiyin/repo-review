import { GitHubUser } from '../types';

export interface BlackListState {
    blacklisters: GitHubUser[];
}

export enum BlacklistActionTypes {
    ADD_BLACKLIST_ITEM = 'ADD_BLACKLIST_ITEM',
    REMOVE_BLACKLIST_ITEM = 'REMOVE_BLACKLIST_ITEM',
    CLEAR_BLACKLIST = 'CLEAR_BLACKLIST'
}

interface AddBlacklistItemAction {
    type: BlacklistActionTypes.ADD_BLACKLIST_ITEM;
    payload: GitHubUser;
}

interface RemoveBlacklistItemAction {
    type: BlacklistActionTypes.REMOVE_BLACKLIST_ITEM;
    payload: GitHubUser;
}

interface ClearBlacklistAction {
    type: BlacklistActionTypes.CLEAR_BLACKLIST;
}

export type BlacklistAction = AddBlacklistItemAction | RemoveBlacklistItemAction | ClearBlacklistAction;
