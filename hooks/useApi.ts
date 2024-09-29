import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useState, useEffect } from "react";

type ApiError = {
  message: string;
  status?: number;
};

export const useApi = <T>(url: string, options?: AxiosRequestConfig) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response: AxiosResponse<T> = await axios(url, options);
      // console.log(JSON.stringify(response.data));
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
  }, [url, options]);

  return { data, isLoading, error };
};
