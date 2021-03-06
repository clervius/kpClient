import {  AxiosPromise } from 'axios';
import { IQuestionRequest, ITopic } from '../state-management/models/';
import { questionGetSingleUrl, questionGetManyUrl, questionCreateUrl, questionUpdateUrl, questionDeleteUrl,
  questionAddTopicUrl, questionRmTopic, questionToggleAgree, questionAllOfThem, questionQueryTopicSortUrl,
  questionSearchUrl
} from './';
import API, {  config } from './api';

export const getSingleQuestion = (id: string): AxiosPromise => API.get(questionGetSingleUrl(id));
export const getQuestionsByTopic = (topicId: string): AxiosPromise => API.get(questionGetManyUrl(topicId));
export const postCreateQuestion = (body: IQuestionRequest): AxiosPromise => API.post(questionCreateUrl, body, config());
export const postUpdateQuestion = (id: string, body: { [key: string]: any }): AxiosPromise => API.post(questionUpdateUrl(id), body, config());
export const deleteQuestion = (id: string): AxiosPromise => API.delete(questionDeleteUrl(id), config());
export const postQuestionAddTopic = (id: string, body: { topics: ITopic[] }): AxiosPromise => API.post(questionAddTopicUrl(id), body, config());
export const postQuestionRmTopic = (id: string, topicId: string): AxiosPromise => API.post(questionRmTopic(id, topicId), undefined, config());
export const putQuestionToggleAgree = (id: string, topicId: string): AxiosPromise => API.put(questionToggleAgree(id, topicId), undefined, config());
export const getAllQuestions = (): AxiosPromise => API.get(questionAllOfThem);
export const postQueryQuestionByTopicAndSort = (sort: { [key: string]: any }, topics: string[] = [], already: string[] = []): AxiosPromise => API.post(questionQueryTopicSortUrl, { sort, topics, already });
export const postQuestionSearch = (text: string, already: string[] = []): AxiosPromise => API.post(questionSearchUrl, { text, already });
