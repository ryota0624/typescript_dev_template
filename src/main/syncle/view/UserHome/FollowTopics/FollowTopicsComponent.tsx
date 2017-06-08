import * as React from "react";
import {FollowTopicsView, TopicDto, FollowTopicsViewEvents} from "../../../pageObjects/followTopics";
import {Resource} from "../../../stateHalper";

export function FollowTopicsComponent(props: FollowTopicsView & FollowTopicsViewEvents) {
  if (props.resource !== Resource.Fulfill) {
    return <div>loading</div>
  }
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

