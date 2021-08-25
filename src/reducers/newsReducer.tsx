import { PostsActionType } from "./types";
import { NewsActionType } from "reducers/types";
import { IImageFile } from "model/AuthForm";

const {
    NEWS_LOADED_SUCCESS,
    NEWS_LOADED_FAIL,
    ADD_NEWS,
    DELETE_NEWS,
    FIND_NEWS_BY_ID,
    UPDATE_NEWS,
} = NewsActionType;

export interface News {
    _id: string;
    title: string;
    description: string;
    url: string;
    imageFile: IImageFile;
}

export interface NewsReducerState {
    newsListing: News[];
    newsListingLoading: boolean;
    newsDetail: News;
}

type PostAction =
    | {
          type: typeof NEWS_LOADED_SUCCESS;
          payload: News[];
      }
    | {
          type: typeof NEWS_LOADED_FAIL;
          payload: News[];
      }
    | {
          type: typeof ADD_NEWS;
          payload: News;
      }
    | {
          type: typeof DELETE_NEWS;
          payload: string;
      }
    | {
          type: typeof FIND_NEWS_BY_ID;
          payload: News;
      }
    | {
          type: typeof UPDATE_NEWS;
          payload: News;
      };

export const newsReducer = (state: NewsReducerState, action: PostAction) => {
    switch (action.type) {
        case NEWS_LOADED_SUCCESS:
            return {
                ...state,
                newsListing: action.payload,
                newsListingLoading: false,
            };
        case ADD_NEWS:
            return {
                ...state,
                newsListing: [...state.newsListing, action.payload],
            };
        case DELETE_NEWS:
            return {
                ...state,
                newsListing: state.newsListing.filter((news) => news._id !== action.payload),
            };
        case FIND_NEWS_BY_ID:
            return {
                ...state,
                newsDetail: action.payload,
            };
        case UPDATE_NEWS:
            const newNews = state.newsListing.map((post) => {
                if (post._id === action.payload._id) {
                    return action.payload;
                } else {
                    return post;
                }
            });
            return {
                ...state,
                newsListing: newNews,
            };
        default:
            return state;
    }
    return state;
};