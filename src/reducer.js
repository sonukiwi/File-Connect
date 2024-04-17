import { get_formatted_date, get_formatted_size } from "./utils";

export function reducer(state, action) {
  switch (action.type) {
    case "START__PAGE_LOADING":
      return {
        ...state,
        isPageLoading: true,
      };
    case "COMPLETE__PAGE_LOADING":
      return {
        ...state,
        isPageLoading: false,
      };
    case "START__LOAD_MORE_FILES":
      return {
        ...state,
        isLoadMoreFilesBtnLoading: true,
      };
    case "COMPLETE__LOAD_MORE_FILES":
      return {
        ...state,
        isLoadMoreFilesBtnLoading: false,
      };
    case "SET_FILES_INFO":
      let { payload: data } = action;
      data = {
        ...data,
        Contents:
          data.Contents?.length > 0
            ? data.Contents.map((s3Object) => {
                const s3ObjectKey = s3Object.Key;
                return {
                  ...s3Object,
                  fileName: s3ObjectKey.substring(
                    s3ObjectKey.lastIndexOf("/") + 1
                  ),
                  LastModified: get_formatted_date(s3Object.LastModified),
                  Size: get_formatted_size(s3Object.Size),
                };
              })
            : [],
      };
      return {
        ...state,
        filesInfo: {
          ...state.filesInfo,
          IsTruncated: data.IsTruncated,
          Contents:
            state.filesInfo.Contents?.length > 0
              ? [...state.filesInfo.Contents, ...data.Contents]
              : [...data.Contents],
        },
      };
    case "REMOVE_FILES_FROM_FILES_INFO":
      const { files: filesToRemove } = action.payload;
      return {
        ...state,
        filesInfo: {
          ...state.filesInfo,
          Contents: state.filesInfo.Contents.filter(
            (file) => !filesToRemove.includes(file.fileName)
          ),
        },
      };
    case "SHOW_DIALOG":
      const { heading, description, buttonText } = action.payload;
      return {
        ...state,
        dialog: {
          isVisible: true,
          heading,
          buttonText,
          description,
        },
      };
    case "HIDE_DIALOG":
      return {
        ...state,
        dialog: {
          isVisible: false,
        },
      };
    case "SHOW_USER_INFO_DIALOG":
      return {
        ...state,
        userInfoModal: {
          isVisible: true,
        },
      };
    case "HIDE_USER_INFO_DIALOG":
      return {
        ...state,
        userInfoModal: {
          isVisible: false,
        },
      };
    case "SET_USER_INFO":
      const { payload: userInfo } = action;
      return {
        ...state,
        userInfo,
      };
    case "START__USER_INFO_LOADING":
      return {
        ...state,
        isUserInfoLoading: true,
      };
    case "COMPLETE__USER_INFO_LOADING":
      return {
        ...state,
        isUserInfoLoading: false,
      };
    case "SHOW_TOAST":
      const { message } = action.payload;
      return {
        ...state,
        toast: {
          ...state.toast,
          isVisible: true,
          message,
        },
      };
    case "HIDE_TOAST":
      return {
        ...state,
        toast: {
          ...state.toast,
          isVisible: false,
        },
      };
    case "RESET_FILES_INFO":
      return {
        ...state,
        filesInfo: {},
      };
    case "ADD_CHECKED_INDEX":
      const { index } = action.payload;
      return {
        ...state,
        checkedIndexes: [...state.checkedIndexes, index],
      };
    case "REMOVE_CHECKED_INDEX":
      const { index: indexToRemove } = action.payload;
      return {
        ...state,
        checkedIndexes: state.checkedIndexes.filter(
          (index) => index !== indexToRemove
        ),
      };
    case "RESET_CHECKED_INDEXES":
      return {
        ...state,
        checkedIndexes: [],
      };
    default:
      return state;
  }
}
