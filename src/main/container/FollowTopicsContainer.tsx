import {FollowTopicsState} from "../reducers/followTopics/reducer";
import { connect } from 'react-redux'
import {FollowTopicsComponent} from "../syncle/view/UserHome/FollowTopics/FollowTopicsComponent";
import {TopicDto} from "../syncle/pageObjects/followTopics";
import {Topic} from "../syncle/domains/topic/Topic";
import {Dispatch} from "redux";
import {
  FollowTopicsAction, storeFollowTopicsCreator,
  startStoreFollowTopicsCreator, followTopicCreator, unFollowTopicCreator
} from "../reducers/followTopics/actionTypes";
import {GetUserFollowTopics} from "../syncle/usecases/GetUserFollowTopics";
import {UseCase} from "../syncle/usecases/UseCase";
import {UserFollowTopic} from "../syncle/usecases/UserFollowTopic";
import {UserUnFollowTopic} from "../syncle/usecases/UserUnFollowTopic";
import * as React from "react";
function topicModel2Dto({id, title, imageUrl, followed}: Topic): TopicDto {
  return {id: id.value, title: title.value, imageUrl: imageUrl.value, followed};
}

/**
 * Created by ryota on 2017/06/04.
 */

interface mapStateToPropsCreatorArgs {
  userId: number;
}
function mapStateToPropsCreator({userId}: mapStateToPropsCreatorArgs) {
  return (state: FollowTopicsState) => {
    return {
      topics: state.topics.map(topicModel2Dto),
      userId,
      resource: state.resource
    }
  }
}

interface injectDispatchArgs {
  userFollowTopicUseCase: UserFollowTopic
  getUserFollowTopicsUseCase: GetUserFollowTopics;
  userUnFollowTopicUseCase: UserUnFollowTopic;
  userId: number
}
function injectDispatchCreator({
  getUserFollowTopicsUseCase,
  userId,
  userFollowTopicUseCase,
  userUnFollowTopicUseCase}: injectDispatchArgs) {
  return (dispatch: Dispatch<FollowTopicsAction>) => {
    const storeFollowTopics = storeFollowTopicsCreator(dispatch);
    const startStoreFollowTopics = startStoreFollowTopicsCreator(dispatch);
    const userFollowTopic = followTopicCreator(dispatch);
    const userUnFollowTopic = unFollowTopicCreator(dispatch);

    function getFollowTopics() {
      getUserFollowTopicsUseCase.onStart(startStoreFollowTopics);
      getUserFollowTopicsUseCase.onResult(storeFollowTopics);
      return () => {
        UseCase.execute({userId}, getUserFollowTopicsUseCase)
      }
    }

    function followTopic() {
      userFollowTopicUseCase.onResult(userFollowTopic);
      userFollowTopicUseCase.onStart(() => {
        console.log("start follow")
      });
      return (topicId: number) => {
        UseCase.execute({userId, topicId}, userFollowTopicUseCase);
      }
    }

    function unFollowTopic() {
      userUnFollowTopicUseCase.onResult(userUnFollowTopic);
      userUnFollowTopicUseCase.onStart(() => {
        console.log("start unfollow")
      });
      return (topicId: number) => {
        UseCase.execute({userId, topicId}, userUnFollowTopicUseCase);
      }
    }

    return {
      getFollowTopics: getFollowTopics(),
      followTopic: followTopic(),
      unFollowTopic: unFollowTopic()
    }
  }
}

class Container extends React.Component<any, any> {
  render() {
    return <FollowTopicsComponent {...this.props}/>
  }
}

export default ({ getUserFollowTopicsUseCase, userId, userFollowTopicUseCase, userUnFollowTopicUseCase }: mapStateToPropsCreatorArgs & injectDispatchArgs) =>
  connect(
    mapStateToPropsCreator({userId}),
    injectDispatchCreator({getUserFollowTopicsUseCase, userFollowTopicUseCase, userUnFollowTopicUseCase, userId})
  )(Container);