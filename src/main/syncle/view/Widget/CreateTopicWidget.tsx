/**
 * Created by ryota on 2017/06/05.
 */
import * as React from "react";
import {CreateTopicWidgetEvents, CreateTopicWidgetView} from "../../pageObjects/Widget/CreateTopicWidget";
import ChangeEventHandler = React.ChangeEventHandler;
import ChangeEvent = React.ChangeEvent;

function inputText(fn: (t: string) => void) {
  return (e: ChangeEvent<any>) => {
    const text = e.target.value;
    fn(text);
  }
}

export function CreateTopicWidgetComponent(props: CreateTopicWidgetView & CreateTopicWidgetEvents): JSX.Element {
  const {sendInputTopicDescribe, sendInputTopicTitle, sendInputFormImageUrl, sendInputFormTagName} = props;
  const {selectTag, selectedTagNames, createTopic} = props;
  const {inputFormTopicTitle, inputFormTopicDescribe, inputFormTagName, inputFormImageUrl} = props;
  console.log(props)
  return (
    <div>
      title<input value={inputFormTopicTitle} onChange={inputText(sendInputTopicTitle)}/>
      descrit<input value={inputFormTopicDescribe} onChange={inputText(sendInputTopicDescribe)}/>
      imageUrl<input value={inputFormImageUrl} onChange={inputText(sendInputFormImageUrl)}/>
      tagName<input value={inputFormTagName} onChange={inputText(sendInputFormTagName)} />
      tagInput[{props.inputFormTagName}]<button onClick={() => selectTag(props.inputFormTagName)}>add Tag</button>
      selectedTags:
      <ul>
        {selectedTagNames.map(tagName => <li key={tagName}>{tagName}</li>)}
      </ul>
      <br/>
      <button onClick={() => createTopic(props)}>create topic</button>
    </div>
  );

}