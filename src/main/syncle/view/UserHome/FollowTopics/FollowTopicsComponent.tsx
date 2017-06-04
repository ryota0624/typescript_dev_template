import * as React from "react";
import {UseCase} from "../../../usecases/UseCase";
import {FollowTopicsView, TopicDto, FollowTopicsViewEvents} from "../../../pageObjects/followTopics";

export function FollowTopicsComponent(props: FollowTopicsView & FollowTopicsViewEvents) {
  const {topics} = props;
  const topicsView = topics.map(topic => {
    const followButtonHandler = topic.followed ? props.unFollowTopic : props.followTopic;
    return (
      <TopicView key={topic.id} topic={topic} onClickFollow={() => followButtonHandler(topic.id)}/>
    );
  });
  return (
    <div>
      "topics"
      {topicsView}
    </div>
  );
}

type TopicViewAction = {onClickFollow: () => void}
type TopicViewProps = { topic: TopicDto };
function TopicView(props: TopicViewProps & TopicViewAction) {
  return (
    <div>
      <p>{props.topic.title}</p>
      <img src={props.topic.imageUrl}/>
      <p onClick={props.onClickFollow}>{props.topic.followed ? "love" : "glay"}</p>
    </div>);
}

