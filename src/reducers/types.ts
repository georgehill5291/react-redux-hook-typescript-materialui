export enum AuthActionType {
    TOGGLE_AUTH = "TOGGLE_AUTH",
    SET_AUTH = "SET_AUTH",
}

export enum TopMovieActionType {
    GET_TOP_MOVIES = "GET_TOP_MOVIES",
    TOGGLE_TOP_MOVIE_WATCHED = "TOGGLE_TOP_MOVIE_WATCHED",
}

export enum PostsActionType {
    POST_LOADED_SUCCESS = "POST_LOADED_SUCCESS",
    POST_LOADED_FAIL = "POST_LOADED_FAIL",
    ADD_POST = "ADD_POST",
    DELETE_POST = "DELETE_POST",
    UPDATE_POST = "UPDATE_POST",
    FIND_POST_BY_ID = "FIND_POST_BY_ID",
}

export enum NewsActionType {
    NEWS_LOADED_SUCCESS = "NEWS_LOADED_SUCCESS",
    NEWS_LOADED_FAIL = "NEWS_LOADED_FAIL",
    ADD_NEWS = "ADD_NEWS",
    DELETE_NEWS = "DELETE_NEWS",
    UPDATE_NEWS = "UPDATE_NEWS",
    FIND_NEWS_BY_ID = "FIND_POST_BY_ID",
}
