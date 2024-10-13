import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useState, useEffect } from "react";

type ApiError = {
  message: string;
  status?: number;
};

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const useApi = <T>(
  url: string,
  token?: string,
  options?: AxiosRequestConfig
) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const config: AxiosRequestConfig = {
        ...options,
        headers: {
          ...options?.headers,
          Authorization: `Bearer ${token}`,
        },
      };

      console.log("response", url, config);
      const response: AxiosResponse<T> = await axios(url, config);

      setData(response.data);
    } catch (err) {
      console.error("API Error:", err);
      const message = axios.isAxiosError(err)
        ? err.message
        : "An unexpected error occurred";
      const status =
        axios.isAxiosError(err) && err.response
          ? err.response.status
          : undefined;
      setError({ message, status });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url, token]);

  return { data, isLoading, error };
};
