import {Dispatch, connect} from "react-redux";
import {CreatedTopicsAction, storeTopics} from "../reducers/createdTopics/actionTypes";
import {CreatedTopicsState, LoadedCreatedTopicsType, InitialCreatedTopicsType} from "../reducers/createdTopics/reducer";
import {CreatedTopicsEvent, CreatedTopicsView, TopicDto} from "../syncle/pageObjects/createdTopics";
import {Topic} from "../syncle/domains/topic/Topic";
import {Resource} from "../syncle/stateHalper";
import {GetUserCreatedTopicUseCase} from "../syncle/usecases/GetUserCreatedTopicUseCase";
import {UseCase} from "../syncle/usecases/UseCase";
import * as React from "react";
/**
 * Created by ryota on 2017/06/09.
 */
function topicModel2Dto({id, title, imageUrl, followed}: Topic): TopicDto {
  return {id: id.value, title: title.value, imageUrl: imageUrl.value, followed};
}
function stateToPage(state: CreatedTopicsState): CreatedTopicsView {
  switch (state.type) {
    case LoadedCreatedTopicsType:
      const topics = state.topics.map(topicModel2Dto);
      return {
        topics,
        resource: Resource.Fulfill
      };
    case InitialCreatedTopicsType:
      return {
        topics: [],
        resource: Resource.Initial
      }
  }
}

interface CreateEventUseCaseArgs {
  userId: number;
  getUserCreatedTopicsUseCase: GetUserCreatedTopicUseCase;
}

export function createEvent(dispatch: Dispatch<CreatedTopicsAction>,
                            usecases: CreateEventUseCaseArgs): (state: CreatedTopicsState) => CreatedTopicsEvent {
  usecases.getUserCreatedTopicsUseCase.onResult(topics => {
    dispatch(storeTopics(topics));
  });

  return () => {
    return {
      getCreatedTopics() {
        UseCase.execute({userId: usecases.userId}, usecases.getUserCreatedTopicsUseCase);
      }
    };
  }
}

export function connectPage(args: CreateEventUseCaseArgs, dispatch: Dispatch<CreatedTopicsAction>) {
  const events = createEvent(dispatch, args);
  return (viewFunction: (props: CreatedTopicsView&CreatedTopicsEvent) => JSX.Element) => {
    class Wrapper extends React.Component<any, any> {
      render() {
        const page = stateToPage(this.props.createdTopics);
        return viewFunction(Object.assign({}, events(this.props), page));
      }
    }
    return connect((state) => ({...state}))(Wrapper);
  }
}