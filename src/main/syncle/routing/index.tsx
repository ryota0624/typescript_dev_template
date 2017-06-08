/**
 * Created by ryota on 2017/06/03.
 */
import * as React from "react";
import {Provider} from 'react-redux'

import FollowTopicsContainerCreator from "../../container/FollowTopicsContainer";
import CreateTopicContainerCreator from "../../container/CreateTopicWidgetContainer";
import * as CreatedTopicsContainere from "../../container/CreatedTopicsContainer";

import {TopicRepositoryOnMem} from "../adaptors/Memory/TopicRepositoryOnMem";
import {UserRepositoryOnMem} from "../adaptors/Memory/UserRepositoryOnMem";
import {GetUserFollowTopics} from "../usecases/GetUserFollowTopicsUseCase";
import {Store} from "redux";
import {UserFollowTopicUseCase} from "../usecases/UserFollowTopicUseCase";
import {UserUnFollowTopicUseCase} from "../usecases/UserUnFollowTopicUseCase";
import {ApplicationState} from "../../reducers/Application/Application";
import {CreateTopic} from "../usecases/CreateTopicUseCase";
import {TagRepositoryOnMem} from "../adaptors/Memory/TagRepositoryOnMem";
import {GetUserCreatedTopicUseCase} from "../usecases/GetUserCreatedTopicUseCase";
import {CreatedTopicsComponent} from "../view/UserHome/CreatedTopics/CreatedTopicsComponent";
import {UseCase} from "../usecases/UseCase";
const topicRepository = new TopicRepositoryOnMem();
const userRepository = new UserRepositoryOnMem();
const tagRepository = new TagRepositoryOnMem();

export function app(store: Store<ApplicationState>) {
  const userFollowTopicUseCase = new UserFollowTopicUseCase(topicRepository, userRepository);
  const getUserFollowTopicsUseCase = new GetUserFollowTopics(topicRepository, userRepository);
  const userUnFollowTopicUseCase = new UserUnFollowTopicUseCase(topicRepository, userRepository);
  const getUserCreatedTopicsUseCase = new GetUserCreatedTopicUseCase(userRepository, topicRepository);

  const createTopicUseCase = new CreateTopic(topicRepository, tagRepository);
  const FollowTopicsContainer = FollowTopicsContainerCreator({topicRepository, userUnFollowTopicUseCase, userFollowTopicUseCase ,userId: 10, getUserFollowTopicsUseCase: getUserFollowTopicsUseCase});
  const CreateTopicContainer = CreateTopicContainerCreator({userId: 10, tagRepository, createTopicUseCase});
  const CreatedTopicsContainer = CreatedTopicsContainere.connectPage({userId: 10, getUserCreatedTopicsUseCase}, store.dispatch)(CreatedTopicsComponent);
  class AppContainer extends React.Component<any, any> {
    componentDidMount() {

      UseCase.execute({userId: 10}, getUserCreatedTopicsUseCase);
      UseCase.execute({userId: 10}, getUserFollowTopicsUseCase);
    }
    render() {
      return (
        <div>
          <CreatedTopicsContainer {...this.props}/>
          <FollowTopicsContainer {...this.props}/>
          <CreateTopicContainer {...this.props}/>
        </div>
      )
    }
  };

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