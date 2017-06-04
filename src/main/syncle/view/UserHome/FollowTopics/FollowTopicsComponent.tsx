import * as React from "react";
import {UseCase} from "../../../usecases/UseCase";
import {FollowTopicsView, TopicDto} from "../../../reduxDataflow/reducers/followTopics";

export function FollowTopicsComponent(props: FollowTopicsView) {
  const {topics, userId} = props;
  const topicsView = topics.map(topic => {
    const action:TopicViewAction = {
      onClickFollow: () => UseCase.execute({topicId: topic.id, userId: userId}, topic.followed ? props.action.userUnFollowTopic : props.action.userFollowTopic),
    };
    return (
      <TopicView key={topic.id} action={action} topic={topic}/>
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
type TopicViewProps = { topic: TopicDto, action: TopicViewAction };
function TopicView(props: TopicViewProps) {
  return (
    <div>
      <p>{props.topic.title}</p>
      <img src={props.topic.imageUrl}/>
      <p onClick={props.action.onClickFollow}>{props.topic.followed ? "love" : "glay"}</p>
    </div>);
}

