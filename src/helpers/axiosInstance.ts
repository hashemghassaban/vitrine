import axios, { type AxiosResponse } from "axios";
import { useState, useCallback } from "react";
import { header } from "./header";

// In SSR deployments this must stay same-origin so the Node server can proxy it.
// A different value is still supported for intentionally static-only builds.
const baseAPI = (import.meta.env.VITE_API_BASE_URL || "/api").replace(/\/$/, "");

interface FilterParams {
  [key: string]: string | number | boolean | undefined;
}

interface PaginationParams {
  page?: number;
  pageSize?: number;
}

const useCustomAxios = (currentLang:string) => {
  const [pagination, setPagination] = useState<PaginationParams>({
    page: undefined,
    pageSize: undefined,
  });
  const [filters, setFilters] = useState<FilterParams>({});
  const [searchQuery, setSearchQuery] = useState<string>("");

  const axiosInstance = axios.create({
    baseURL: baseAPI,
    headers: header(currentLang),
  });

  const axiosAuthInstance = axios.create({
    baseURL: baseAPI,
    headers: header(currentLang),
  });

  axiosAuthInstance.interceptors.request.use((config) => {
    return config;
  });

  const withCustomHeaders = (customHeaders: Record<string, string>) => {
    const finalHeaders = {
      ...header(currentLang),
      ...customHeaders,
    };

    return axios.create({
      baseURL: baseAPI,
      headers: finalHeaders,
    });
  };

  const performRequest = useCallback(
    async <T>(
      method: "get" | "post" | "put" | "delete",
      url: string,
      data?: any,
      customHeaders: Record<string, string> = {}
    ): Promise<AxiosResponse<T>> => {
      const axiosClient = withCustomHeaders(customHeaders);

      const params: FilterParams = {
        ...filters,
        ...(searchQuery && { search: searchQuery }),
        page: pagination.page,
        pageSize: pagination.pageSize,
      };

      switch (method) {
        case "get":
          return await axiosClient.get<T>(url, { params }); // Changed to T
        case "post":
          return await axiosClient.post<T>(url, data, { params }); // Changed to T
        case "put":
          return await axiosClient.put<T>(url, data, { params }); // Changed to T
        case "delete":
          return await axiosClient.delete<T>(url, { params }); // Changed to T
        default:
          throw new Error("Unsupported method");
      }
    },
    [filters, searchQuery, pagination]
  );

  // Hooks for each method
  const useGetData = <T>(
    url: string,
    customHeaders: Record<string, string> = {}
  ) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await performRequest<T>(
          "get",
          url,
          undefined,
          customHeaders
        );
        setData(res.data); // Changed from res.data to res.data
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    return { data, loading, error, fetchData };
  };
  // !!__________POST__DATA___________
  const usePostData = <T>(
    url: string,
    customHeaders: Record<string, string> = {}
  ) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);

    const sendData = async (body: any) => {
      setLoading(true);
      setError(null);
      try {
        const res = await performRequest<T>("post", url, body, customHeaders);
        setData(res.data); // Changed from res.data to res.data
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    return { data, loading, error, sendData };
  };
  //!!________USE__UPDATE___DATA___
  const useUpdateData = <T>(
    url: string,
    customHeaders: Record<string, string> = {}
  ) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);

    const sendData = async (body: any) => {
      setLoading(true);
      setError(null);
      try {
        const res = await performRequest<T>("put", url, body, customHeaders);
        setData(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    return { data, loading, error, sendData };
  };
  // !!_______DELETE___DATA___
  const useDeleteData = <T>(
    url: string,
    customHeaders: Record<string, string> = {}
  ) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);

    const remove = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await performRequest<T>(
          "delete",
          url,
          undefined,
          customHeaders
        );
        setData(res.data); // Changed from res.data to res.data
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    return { data, loading, error, remove };
  };

  // Filter/Search/Pagination
  const addFilter = (
    key: string,
    value: string | number | boolean | undefined
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const removeFilter = (key: string) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  };

  const clearFilters = () => setFilters({});
  const setSearch = (query: string) => setSearchQuery(query);
  const clearSearch = () => setSearchQuery("");
  const setPage = (page: number) =>
    setPagination((prev) => ({ ...prev, page }));
  const setPageSize = (pageSize: number) =>
    setPagination((prev) => ({ ...prev, pageSize, page: 1 }));

  return {
    axiosInstance,
    axiosAuthInstance,
    withCustomHeaders,
    performRequest,
    useGetData,
    usePostData,
    useUpdateData,
    useDeleteData,
    addFilter,
    removeFilter,
    clearFilters,
    setSearch,
    clearSearch,
    setPage,
    setPageSize,
    filters,
    searchQuery,
    pagination,
  };
};

export default useCustomAxios;
