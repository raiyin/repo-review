import * as RepoActionCreators from './repo';
import * as ContribActionCreators from './contrib';
import * as BlacklistActionCreators from './blacklist';

export default {
    ...RepoActionCreators,
    ...ContribActionCreators,
    ...BlacklistActionCreators
};
