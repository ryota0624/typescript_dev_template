import {Topic} from "../../domains/topic/Topic";
import {matchWithDefault, caseOf} from "../../../reducers/TodoReducer";
import {PageObject} from "../../pageObjects/PageObject";
import {Resource} from "../stateHalper";
/**
 * Created by ryota on 2017/06/04.
 */
class ResultGetFollowTopic {
  constructor(public topics: Topic[]) {
  }
}

class StartGetFollowTopic {
}

export interface TopicDto extends PageObject {
  id: number;
  followed: boolean;
  title: string;
  imageUrl: string;
}

export interface FollowTopicsView extends PageObject {
  userId: number;
  topics: TopicDto[];
  resource: Resource
}

function topicModel2Dto({id, title, imageUrl}: Topic): TopicDto {
  return {id: id.value, title: title.value, imageUrl: imageUrl.value, followed: true};
}

export default matchWithDefault<FollowTopicsView>({
  userId: 0,
  topics: [],
  resource: Resource.Initial
})(
  caseOf(ResultGetFollowTopic)(({topics}, state: FollowTopicsView) => {
    return { ...state, topics: topics.map(topicModel2Dto)};
  }),
  caseOf(StartGetFollowTopic)((msg, state: FollowTopicsView) => {
    return state;
  })
);