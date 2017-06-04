/**
 * Created by ryota on 2017/06/03.
 */
import * as React from "react";
import {Provider} from 'react-redux'

import FollowTopicsContainerCreator from "../../container/FollowTopicsContainer";
import {TopicRepositoryOnMem} from "../adaptors/Memory/TopicRepositoryOnMem";
import {UserRepositoryOnMem} from "../adaptors/Memory/UserRepositoryOnMem";
import {GetUserFollowTopics} from "../usecases/GetUserFollowTopics";
import {UseCase} from "../usecases/UseCase";
import {Store} from "redux";
import {FollowTopicsState} from "../../reducers/followTopics/reducer";
import {UserFollowTopic} from "../usecases/UserFollowTopic";
import {UserUnFollowTopic} from "../usecases/UserUnFollowTopic";
const topicRepository = new TopicRepositoryOnMem();
const userRepository = new UserRepositoryOnMem();

export function app(store: Store<FollowTopicsState>) {
  const userFollowTopicUseCase = new UserFollowTopic(topicRepository, userRepository);
  const getUserFollowTopicsUseCase = new GetUserFollowTopics(topicRepository, userRepository);
  const userUnFollowTopicUseCase = new UserUnFollowTopic(topicRepository, userRepository);
  UseCase.execute({userId: 10}, getUserFollowTopicsUseCase);
  const FollowTopicsContainer: any = FollowTopicsContainerCreator({userUnFollowTopicUseCase, userFollowTopicUseCase ,userId: 10, getUserFollowTopicsUseCase: getUserFollowTopicsUseCase});
  return class App extends React.Component<any, any> {
    render() {
      return (
        <Provider store={store}>
          <FollowTopicsContainer/>
        </Provider>
      );
    }
  }
}