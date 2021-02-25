import {
  CLEAR_FRWA,
  ENTRIES_ERROR,
  ENTRIES_UPDATE,
  POST_IMAGE_TO_API_FAIL,
  POST_IMAGE_TO_API_SUCCESS,
  SET_IMAGE_BOX,
  SET_IMAGE_URL,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case POST_IMAGE_TO_API_SUCCESS:
      return {
        ...state,
        boundingBox: action.payload.outputs[0].data.regions.map(
          (regions) => regions.region_info.bounding_box
        ),
      };
    case SET_IMAGE_BOX:
      return {
        ...state,
        box: action.payload,
      };
    case SET_IMAGE_URL:
      return {
        ...state,
        imageUrl: action.payload,
      };
    case ENTRIES_UPDATE:
      return {
        ...state,
        updatedEntries: action.payload,
      };
    case POST_IMAGE_TO_API_FAIL:
    case ENTRIES_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_FRWA:
      return {
        ...state,
        imageUrl: null,
        input: null,
        box: null,
        boundingBox: null,
        updatedEntries: null,
        error: null,
      };

    default:
      throw new Error(`Unsupported type of: ${action.type}`);
  }
};
