/**
 * Created by ryota on 2017/06/03.
 */
import * as React from "react";
import {FollowTopicsComponent} from "../view/UserHome/FollowTopics/FollowTopicsComponent";
import {followTopicPageContainer} from "../pageObjects/FollowTopicsPage";
import {TopicRepositoryOnMem} from "../adaptors/Memory/TopicRepositoryOnMem";
import {UserRepositoryOnMem} from "../adaptors/Memory/UserRepositoryOnMem";

const FollowTopics = followTopicPageContainer(new TopicRepositoryOnMem, new UserRepositoryOnMem)(FollowTopicsComponent);
export class App extends React.Component<any, any> {
  //static childContextTypes = {
  //  userId: React.PropTypes.number
  //};
  //
  //getChildContext() {
  //  return {userId: 0};
  //}

  render() {
    return (<FollowTopics userId={10}/>);
  }
}