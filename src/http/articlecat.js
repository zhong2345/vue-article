import instance from "./axios";

// 添加接口
const AddArticleCat = (data) => {
  return instance.request({
    url: "api/articleCat/add",
    method: "post",
    data,
  });
};
// all接口
const ArticleCatPage = () => {
  return instance.request({
    url: "api/articleCat/all",
    method: "get",
  });
};
// colums接口
const getArticleCatsByColums = (id) => {
  return instance.request({
    url: "api/articleCat/colums",
    method: "get",
  });
};
// 删除接口
const ArticleCatDelId = (params) => {
  return instance.request({
    url: "api/articleCat/delete",
    method: "get",
    params
  });
};
// 编辑接口
const ArticleCatEdit = (data) => {
  return instance.request({
    url: "api/articleCat/edit",
    method: "post",
    data
  });
};
// 选择接口
const getArticleCatForSelect = (params) => {
  return instance.request({
    url: "api/articleCat/getArticleCatForSelect",
    method: "get",
    params,
  });
};
// one接口
const getOneArticleCat = (id) => {
    return instance.request({
      url: "api/articleCat/one",
      method: "get",
      params: {
        id: id,
      },
    });
  };

export {
  AddArticleCat,
  ArticleCatPage,
  getArticleCatsByColums,
  ArticleCatDelId,
  ArticleCatEdit,
  getArticleCatForSelect,
  getOneArticleCat,
};