import {ApplicationState} from "../reducers/Application/Application";
import {CreateTopicWidgetView, CreateTopicWidgetEvents} from "../syncle/pageObjects/Widget/CreateTopicWidget";
import {name, TagName, Tag, LoveLevel} from "../syncle/domains/tag/Tag";
import {CreateTopic, CreateTopicArgs, TopicDTO} from "../syncle/usecases/CreateTopic";
import {Dispatch, connect} from "react-redux";
import {
  CreateTopicWidgetAction, inputFormCreator, transitionToScene,
  SelectTag
} from "../reducers/createTopicWidget/actionTypes";
import {CreateTopicWidgetForm, CreateTopicWidgetScene} from "../reducers/createTopicWidget/reducer";
import {TagRepository} from "../syncle/domains/tag/TagRepository";
import {UseCase} from "../syncle/usecases/UseCase";
import * as React from "react";
import {CreateTopicWidgetComponent} from "../syncle/view/Widget/CreateTopicWidget";

/**
 * Created by ryota on 2017/06/04.
 */
interface mapStateToPropsCreatorArgs {
  userId: number;
}

type Creator<Base, Args> = {
  [K in keyof Base]: (args: Args) => Base[K];
}

function mapStateToPropsCreator({userId}: mapStateToPropsCreatorArgs) {
  return function ({createTopicWidget}: ApplicationState): CreateTopicWidgetView {
    return {
      userId,
      show: createTopicWidget.show,
      scene: createTopicWidget.scene,
      inputFormTagName: createTopicWidget.inputFormTagName.value,
      inputFormTopicTitle: createTopicWidget.inputFormTopicTitle.value,
      inputFormImageUrl: createTopicWidget.inputFormImageUrl.value,
      inputFormTopicDescribe: createTopicWidget.inputFormTopicDescribe.value,
      selectedTagNames: createTopicWidget.selectTags.map(name),
      suggestTags: {
        recentlySeeTags: createTopicWidget.suggestTags.recentlySeeTags.map(name),
        alreadyTags: createTopicWidget.suggestTags.alreadyTags.map(name)
      }
    }
  }
}

interface InjectEventArgs {
  createTopicUseCase: CreateTopic;
  tagRepository: TagRepository;
  userId: number;
}

function injectEvent({createTopicUseCase, userId, tagRepository}: InjectEventArgs) {
  return function (dispatch: Dispatch<CreateTopicWidgetAction>): Creator<CreateTopicWidgetEvents, CreateTopicWidgetView> {
    function sendInputTopicTitle(view: CreateTopicWidgetView) {
      return (title: string) => dispatch(inputFormCreator(CreateTopicWidgetForm.TopicTitle)(title));
    }

    function sendInputTopicDescribe(view: CreateTopicWidgetView) {
      return (title: string) => dispatch(inputFormCreator(CreateTopicWidgetForm.TopicDescribe)(title));
    }

    function sendInputFormImageUrl(view: CreateTopicWidgetView) {
      return (url: string) => dispatch(inputFormCreator(CreateTopicWidgetForm.TopicImageUrl)(url));
    }

    function sendInputFormTagName(view: CreateTopicWidgetView) {
      return (tagName: string) => dispatch(inputFormCreator(CreateTopicWidgetForm.TagName)(tagName));
    }

    function transitionToInputTitle(view: CreateTopicWidgetView) {
      return () => dispatch(transitionToScene(CreateTopicWidgetScene.InputTitle));
    }

    function transitionToPreview(view: CreateTopicWidgetView) {
      return () => dispatch(transitionToScene(CreateTopicWidgetScene.Preview));
    }

    function transitionToEditTag(view: CreateTopicWidgetView) {
      return () => dispatch(transitionToScene(CreateTopicWidgetScene.EditTag));
    }

    function transitionToCreateWaiting(view: CreateTopicWidgetView) {
      return () => dispatch(transitionToScene(CreateTopicWidgetScene.CreateWaiting));
    }

    function selectTag(view: CreateTopicWidgetView) {
      //tagRepository.findById(new TagName(tagName)).then(tag => {
      return (tagName: string) => {
        dispatch({
          type: SelectTag,
          tag: Tag.factory({id: new TagName(tagName), loveLevel: LoveLevel.Zero})
        });
        dispatch(inputFormCreator(CreateTopicWidgetForm.TagName)(""));
      };
      //}).catch()
    }

    function createTopicCreator(view: CreateTopicWidgetView) {
      return () => {
        const topicDto = new TopicDTO(view.inputFormTopicTitle, view.inputFormTopicDescribe, view.inputFormImageUrl);
        const args: CreateTopicArgs = {
          topicDto,
          userId,
          tagNames: view.selectedTagNames
        };
        UseCase.execute(args, createTopicUseCase);
      }
    }

    return {
      sendInputTopicTitle, sendInputTopicDescribe, sendInputFormImageUrl, sendInputFormTagName,
      transitionToInputTitle, transitionToPreview, transitionToEditTag,
      transitionToCreateWaiting, selectTag, createTopic: createTopicCreator
    }
  }
}

export default ({userId, createTopicUseCase, tagRepository}: mapStateToPropsCreatorArgs & InjectEventArgs) =>
  connect<any, any, any, any>(
    mapStateToPropsCreator({userId}),
    injectEvent({createTopicUseCase, tagRepository, userId}),
    (page: CreateTopicWidgetView, injector: any) => {
      function injectPage(page: CreateTopicWidgetView, injector: Creator<CreateTopicWidgetEvents, CreateTopicWidgetView>):CreateTopicWidgetEvents {
        const keys = Object.keys(injector);
        return keys.reduce((events: CreateTopicWidgetEvents, key: keyof Creator<CreateTopicWidgetEvents, CreateTopicWidgetView>) => {
          return ({...events, [key]: injector[key](page)})}, {}) as any;
      }
      return ({...page, ...injectPage(page, injector)});
    }
  )(CreateTopicWidgetComponent)