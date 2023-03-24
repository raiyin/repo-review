import * as MainUserActionCreators from './mainuser';
import * as RepoActionCreators from './repo';
import * as ContribActionCreators from './contrib';
import * as SelectedRepoActionCreators from './selectedrepo';
import * as BlacklistActionCreators from './blacklist';
import * as ReviewerActionCreators from './reviewer';

export default {
    ...MainUserActionCreators,
    ...RepoActionCreators,
    ...ContribActionCreators,
    ...SelectedRepoActionCreators,
    ...BlacklistActionCreators,
    ...ReviewerActionCreators
};
