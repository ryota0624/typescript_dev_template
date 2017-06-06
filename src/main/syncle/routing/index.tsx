/**
 * Created by ryota on 2017/06/03.
 */
import * as React from "react";
import {Provider} from 'react-redux'

import FollowTopicsContainerCreator from "../../container/FollowTopicsContainer";
import CreateTopicContainerCreator from "../../container/CreateTopicWidgetContainer";
import {TopicRepositoryOnMem} from "../adaptors/Memory/TopicRepositoryOnMem";
import {UserRepositoryOnMem} from "../adaptors/Memory/UserRepositoryOnMem";
import {GetUserFollowTopics} from "../usecases/GetUserFollowTopics";
import {UseCase} from "../usecases/UseCase";
import {Store} from "redux";
import {UserFollowTopic} from "../usecases/UserFollowTopic";
import {UserUnFollowTopic} from "../usecases/UserUnFollowTopic";
import {ApplicationState} from "../../reducers/Application/Application";
import {CreateTopic} from "../usecases/CreateTopic";
import {TagRepositoryOnMem} from "../adaptors/Memory/TagRepositoryOnMem";
const topicRepository = new TopicRepositoryOnMem();
const userRepository = new UserRepositoryOnMem();
const tagRepository = new TagRepositoryOnMem();

export function app(store: Store<ApplicationState>) {
  const userFollowTopicUseCase = new UserFollowTopic(topicRepository, userRepository);
  const getUserFollowTopicsUseCase = new GetUserFollowTopics(topicRepository, userRepository);
  const userUnFollowTopicUseCase = new UserUnFollowTopic(topicRepository, userRepository);
  const createTopicUseCase = new CreateTopic(topicRepository, tagRepository);
  UseCase.execute({userId: 10}, getUserFollowTopicsUseCase);
  const FollowTopicsContainer = FollowTopicsContainerCreator({topicRepository, userUnFollowTopicUseCase, userFollowTopicUseCase ,userId: 10, getUserFollowTopicsUseCase: getUserFollowTopicsUseCase});
  const CreateTopicContainer = CreateTopicContainerCreator({userId: 10, tagRepository, createTopicUseCase});
  class AppContainer extends React.Component<any, any> {
    render() {
      return (
        <div>
          <FollowTopicsContainer {...this.props}/>
          <CreateTopicContainer {...this.props}/>
        </div>
      )
    }
  }
  return class App extends React.Component<any, any> {
    render() {
      return (
        <Provider store={store}>
          <AppContainer />
        </Provider>
      );
    }
  }
}