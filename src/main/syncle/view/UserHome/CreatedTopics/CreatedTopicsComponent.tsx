/**
 * Created by ryota on 2017/06/09.
 */

import * as React from "react";
import {CreatedTopicsView, CreatedTopicsEvent, TopicDto} from "../../../pageObjects/createdTopics";
import {Resource} from "../../../stateHalper";

export function CreatedTopicsComponent(props: CreatedTopicsView& CreatedTopicsEvent) {
  console.log(props);
  if (props.resource !== Resource.Fulfill) {
    return <div>loading</div>
  }
  const {topics} = props;
  const topicsView = topics.map(topic => {
    return (
      <TopicView key={topic.id} topic={topic}/>
    );
  });
  return (
    <div>
      "created topics"
      {topicsView}
    </div>
  );
}


type TopicViewProps = { topic: TopicDto };
function TopicView(props: TopicViewProps) {
  return (
    <div>
      <p>{props.topic.title}</p>
      <img src={props.topic.imageUrl}/>
      <p>{props.topic.followed ? "love" : "glay"}</p>
    </div>);
}

