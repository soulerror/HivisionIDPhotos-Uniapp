import { PhotoSize, photoSizes } from "@/model/PhotoSize";
import { MutationTree, GetterTree } from "vuex";
import { copyProperties } from "@/utils/common";
import { PhotoPath } from "@/model/Interfaces";

interface PhotoState {
  photoConfig: PhotoSize;
  photoPath?: PhotoPath;
}

const state: PhotoState = {
  photoConfig: photoSizes[0],
  photoPath: undefined,
};

const getters = {
  photoConfig: (state: PhotoState) => state.photoConfig,
  photoPath: (state: PhotoState) => state.photoPath,
};

const mutations: MutationTree<PhotoState> = {
  /**
   *
   * @param state 状态
   * @param data 相片参数
   */
  SET_PHOTO_SIZE(state: PhotoState, data: PhotoSize) {
    state.photoConfig = data;
  },
  /**
   *
   * @param state 状态
   * @param data 相片
   */
  SET_PHOTO_PATH(state: PhotoState, data: PhotoPath) {
    state.photoPath = data;
  },
};

export default {
  namespace: true,
  state,
  mutations,
  getters,
};
