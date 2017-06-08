/**
 * Created by ryota on 2017/06/05.
 */
import {CreateTopicWidgetState} from "../createTopicWidget/reducer";
import {FollowTopicsState} from "../followTopics/reducer";
import {CreatedTopicsState} from "../createdTopics/reducer";
export type ApplicationState = {
  followTopics: FollowTopicsState;
  createTopicWidget: CreateTopicWidgetState;
  createdTopics: CreatedTopicsState
}
