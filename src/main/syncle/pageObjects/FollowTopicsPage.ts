import {UserFollowTopic, UseUserFollowTopic} from "../usecases/UserFollowTopic";
import {TopicRepository} from "../domains/topic/TopicRepository";
import {Topic as TopicEntity} from "../domains/topic/Topic";
import {UserRepository} from "../domains/user/UserRepository";
import {UserUnFollowTopic, UseUserUnFollowTopic} from "../usecases/UserUnFollowTopic";
import {UserID} from "../domains/user/User";
import {PageObject, PageObjectStream} from "./PageObject";
import * as React from "react";
/**
 * Created by ryota on 2017/06/03.
 */

export interface Topic extends PageObject {
  id: number;
  followed: boolean;
  title: string;
  imageUrl: string;
}

export interface FollowTopicsPageModel extends PageObject {
  userId: number;
  topics: Topic[];
}

export interface FollowTopicsPageUseCases extends UseUserFollowTopic, UseUserUnFollowTopic {
}

export function createFollowTopicsPageUseCases(topicRepository: TopicRepository,
                                               userRepository: UserRepository): FollowTopicsPageUseCases {
  return {
    userFollowTopic: new UserFollowTopic(topicRepository, userRepository),
    userUnFollowTopic: new UserUnFollowTopic(topicRepository, userRepository)
  };
}

export type FollowTopicsPageObject = {model: FollowTopicsPageModel, action: FollowTopicsPageUseCases}

export function followTopicsPage(userId: number,
                                 topicRepository: TopicRepository,
                                 userRepository: UserRepository): Promise<FollowTopicsPageObject> {
  function topicModel2Dto({id, title, imageUrl}: TopicEntity): Topic {
    return {id: id.value, title: title.value, imageUrl: imageUrl.value, followed: true};
  }

  return userRepository.findById(new UserID(userId))
    .then(user => Promise.all([user, topicRepository.findUserFollows(user.id)]))
    .then(([user, topics]) => {
      return {
        model: {
          userId: user.id.value,
          topics: topics.map(topicModel2Dto)
        },
        action: createFollowTopicsPageUseCases(topicRepository, userRepository)
      }
    });
}

export class FollowTopicsPage extends PageObjectStream<FollowTopicsPageObject> {
  constructor(private userId: number,
              private topicRepository: TopicRepository,
              private userRepository: UserRepository) {
    super([userRepository, topicRepository]);
  }

  getPageObject() {
    return followTopicsPage(this.userId, this.topicRepository, this.userRepository);
  }
}

export function followTopicPageContainer(topicRepository: TopicRepository,
                                         userRepository: UserRepository) {
  return (Klass: (props: FollowTopicsPageObject) => JSX.Element) => {
    class TopicPageContainer extends React.Component<{userId:number}, FollowTopicsPageObject> {
      unSub: () => void;
      componentDidUpdate(prevProps: any) {
        if (prevProps.userId !== this.props.userId) {
          this.unSub();
        }
      }

      componentDidMount() {
        this.attachPage()
      }

      attachPage() {
        const page = new FollowTopicsPage(this.props.userId, topicRepository, userRepository);
        this.unSub = page.subscribe((pageObject) => this.setState(pageObject))
      }

      componentWillUnmount() {
        this.unSub();
      }

      render() {
        if (this.state) {
          return React.createElement(Klass, this.state);
        }
        return React.createElement("div", {children: "loading"});//
      }
    }
    return TopicPageContainer;
  }

}