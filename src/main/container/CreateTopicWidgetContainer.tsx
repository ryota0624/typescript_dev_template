import {ApplicationState} from "../reducers/Application/Application";
import {CreateTopicWidgetView, CreateTopicWidgetEvents} from "../syncle/pageObjects/Widget/CreateTopicWidget";
import {name, TagName} from "../syncle/domains/tag/Tag";
import {CreateTopic} from "../syncle/usecases/CreateTopic";
import {Dispatch} from "react-redux";
import {
  CreateTopicWidgetAction, inputFormCreator, transitionToScene,
  SelectTag
} from "../reducers/createTopicWidget/actionTypes";
import {CreateTopicWidgetForm, CreateTopicWidgetScene} from "../reducers/createTopicWidget/reducer";
import {TagRepository} from "../syncle/domains/tag/TagRepository";
/**
 * Created by ryota on 2017/06/04.
 */
interface mapStateToPropsCreatorArgs {
  userId: number;
}

class TopicDTO {
  constructor(
    public title: string,
    public describe: string,
  ){}
}

function mapStateToPropsCreator({userId}: mapStateToPropsCreatorArgs) {
  return function({createTopicWidget}: ApplicationState): CreateTopicWidgetView {
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
  return function (dispatch: Dispatch<CreateTopicWidgetAction>): CreateTopicWidgetEvents {
    function sendInputTopicTitle(title: string) {
      dispatch(inputFormCreator(CreateTopicWidgetForm.TopicTitle)(title));
    }

    function sendInputTopicDescribe(title: string) {
      dispatch(inputFormCreator(CreateTopicWidgetForm.TopicDescribe)(title));
    }

    function sendInputFormImageUrl(url: string) {
      dispatch(inputFormCreator(CreateTopicWidgetForm.TopicImageUrl)(url));
    }

    function sendInputFormTagName(tagName: string) {
      dispatch(inputFormCreator(CreateTopicWidgetForm.TagName)(tagName));
    }

    function transitionToInputTitle() {
      dispatch(transitionToScene(CreateTopicWidgetScene.InputTitle));
    }

    function transitionToPreview() {
      dispatch(transitionToScene(CreateTopicWidgetScene.Preview));
    }

    function transitionToEditTag() {
      dispatch(transitionToScene(CreateTopicWidgetScene.EditTag));
    }

    function transitionToCreateWaiting() {
      dispatch(transitionToScene(CreateTopicWidgetScene.CreateWaiting));
    }

    function selectTag(tagName: string) {
      tagRepository.findById(new TagName(tagName)).then(tag => {
        dispatch({
          type:SelectTag,
          tag
        })
      })
    }

    function createTopic() {

    }



    return {
      sendInputTopicTitle, sendInputTopicDescribe, sendInputFormImageUrl, sendInputFormTagName,
      transitionToInputTitle, transitionToPreview, transitionToEditTag,
      transitionToCreateWaiting, selectTag, createTopic
    }
  }
}