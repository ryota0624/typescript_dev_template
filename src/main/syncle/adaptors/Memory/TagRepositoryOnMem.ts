import {TagRepository} from "../../domains/tag/TagRepository";
import {Repository} from "../../domains/Repository";
import {Tag, TagName} from "../../domains/tag/Tag";
import {TopicID} from "../../domains/topic/Topic";
import {TopicRepositoryOnMem} from "./TopicRepositoryOnMem";
/**
 * Created by ryota on 2017/06/04.
 */

let tagMaps: Map<string, Tag> = new Map();
export class TagRepositoryOnMem extends Repository implements TagRepository {
  store(tag: Tag): Promise<void> {
    tagMaps.set(tag.id.value, tag);
    return Promise.resolve();
  }
  bulkStore(tags: Tag[]): Promise<void> {
    return Promise.all(tags.map(this.store)).then(() => {});
  }

  findById(id: TagName): Promise<Tag> {
    const tag = tagMaps.get(id.value);
    if (tag) {
      return Promise.resolve(tag);
    }
    return Promise.reject(`not found tag ${id}`);
  }

  findAll(): Promise<Tag[]> {
    let tags: Tag[] = [];
    tagMaps.forEach(tag => {
      tags.push(tag);
    });

    return Promise.resolve(tags);
  }

  findTopicTags(topic: TopicID) {
    let tags: Tag[] = [];
    TopicRepositoryOnMem.topicRelTag.forEach(([topicId, tagName]) => {
      if (topicId.equals(topic)) {
        tags.push(Tag.factory({id: tagName}))
      }
    });

    return Promise.resolve(tags);
  }
}

export default new TagRepositoryOnMem();