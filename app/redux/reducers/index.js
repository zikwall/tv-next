import { combineReducers } from 'redux'
import channelsFetchReducer, {
    channelActionReducer, getChannels, getChannelsError, getChannelsPending, getSelectChannel
} from "./channels";

const rootReducer = combineReducers({channelsFetchReducer, channelActionReducer});

export default rootReducer;

export {
    getChannelsPending, getChannelsError, getChannels, getSelectChannel
}