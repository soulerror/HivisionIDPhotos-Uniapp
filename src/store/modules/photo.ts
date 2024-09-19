import { PhotoSize, photoSizes } from "@/model/PhotoSize";
import { MutationTree, GetterTree } from "vuex";
import { copyProperties } from "@/utils/common";

interface PhotoState {
  photoConfig: PhotoSize
}

const state: PhotoState = {
  photoConfig: photoSizes[0],
}

const getters = {
  photoConfig: (state: PhotoState) => state.photoConfig
}


const mutations: MutationTree<PhotoState> = {
  /**
   * 
   * @param state 状态
   * @param data 相片参数
   */
  SET_PHOTO_SIZE(state: PhotoState, data: PhotoSize) {
    state.photoConfig = data
  }
}

export default {
  namespace: true,
  state, mutations, getters
}