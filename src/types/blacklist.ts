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
    payload: any[];
}

interface RemoveBlacklistItemAction {
    type: BlacklistActionTypes.REMOVE_BLACKLIST_ITEM;
    payload: any[];
}


export type BlacklistAction = AddBlacklistItemAction | RemoveBlacklistItemAction;
