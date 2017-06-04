import * as React from "react";
import {FollowTopicsView} from "../reducers/followTopics";
import {UserRepository} from "../../domains/user/UserRepository";
import {TopicRepository} from "../../domains/topic/TopicRepository";
export function followTopicPageContainer(topicRepository: TopicRepository,
                                         userRepository: UserRepository) {
  return (Klass: (props: any) => JSX.Element) => {
    class TopicPageContainer extends React.Component<{}, FollowTopicsView> {
      render() {
        return React.createElement(Klass, this.state);
      }
    }
    return TopicPageContainer;
  }

}