import { Bookmark } from '../../models/bookmarks/bookmark';
import { DomainStatus, initialRequestStatus } from '../../models/domain-status';

export interface State {
  bookmarks: DomainStatus<Bookmark[]>;
}

export const initialState: State = {
  bookmarks: {
    domain: undefined,
    requestStatus: initialRequestStatus,
  },
};
