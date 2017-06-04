import * as React from "react";
import {FollowTopicsPageObject, Topic, FollowTopicsPageUseCases} from "../../../pageObjects/FollowTopicsPage";
import {UseCase} from "../../../usecases/UseCase";

export function FollowTopicsComponent(props: FollowTopicsPageObject) {
  const {model} = props;
  console.log(model)
  const topicsView = model.topics.map(topic => {
    const action:TopicViewAction = {
      onClickFollow: () => UseCase.execute({topicId: topic.id, userId: model.userId}, topic.followed ? props.action.userUnFollowTopic : props.action.userFollowTopic),
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
type TopicViewProps = { topic: Topic, action: TopicViewAction };
function TopicView(props: TopicViewProps) {
  return (
    <div>
      <p>{props.topic.title}</p>
      <img src={props.topic.imageUrl}/>
      <p onClick={props.action.onClickFollow}>{props.topic.followed ? "love" : "glay"}</p>
    </div>);
}

