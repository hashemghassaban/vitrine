import useAxious from "../../helpers/axiosInstance";
import { useTranslate } from "../../i18n/useTranslate";
import type { CommentDTO } from "../../models/dtos/commentDTO";
import type ServerResult from "../../models/ServerResult";
import type { BlogItemView } from "../../models/views/blogView";
import type { BlogCategoryView } from "../../models/views/blogView";

const useBlog = (currentLang: string) => {
  const { axiosAuthInstance } = useAxious(currentLang);
  const { t } = useTranslate();

  // گرفتن پست‌ها
  async function getPosts(categoryId?: number) {
    let success = false;
    let data: BlogItemView[] = [];
    let result = "";

    try {
      const res = await axiosAuthInstance.get<ServerResult<BlogItemView[]>>(
        "/blog",
        {
          params: categoryId ? { category_id: categoryId } : {},
        },
      );

      success = true;
      data = res.data.data;
    } catch {
      result = "Failed to load blog posts";
    }

    return { success, data, result };
  }

  // گرفتن دسته‌بندی‌ها
  async function getCategories() {
    let success = false;
    let data: BlogCategoryView[] = [];
    let result = "";

    try {
      const res = await axiosAuthInstance.get("/blog/categories");
      success = true;
      data = res.data.data;
    } catch {
      result = "Failed to load categories";
    }

    return { success, data, result };
  }

  // گرفتن جزئیات یک بلاگ
  async function getPostById(id: number) {
    let success = false;
    let data: BlogItemView | null = null;
    let result = "";

    try {
      const res = await axiosAuthInstance.get<ServerResult<BlogItemView>>(
        `/blog/${id}`,
      );

      success = true;
      data = res.data.data;
    } catch {
      result = "Failed to load blog post";
    }

    return { success, data, result };
  }

  async function sendCommentPostById(id: number, dto: CommentDTO) {
    let result = "";
    let success = false;
    await axiosAuthInstance
      .post<ServerResult<CommentDTO>>(`/comments/post/${id}`, dto)
      .then((res) => {
        if (res.data.success) {
          success = true;
          result = t("local_sentComment");
        } else {
          result = res.data.message;
        }
      })
      .catch((err: any) => {
        result = err.response?.data?.message || "Operation failed";
      });
    return {
      success,
      result,
    };
  }

  return { getPosts, getCategories, getPostById, sendCommentPostById };
};
export default useBlog;
