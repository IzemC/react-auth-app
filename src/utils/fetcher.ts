import useAuthStore from "../store/auth.store";

export const apiFetcher = async (path: string, options = {}) => {
  const { token, isAuthenticated } = useAuthStore.getState();

  const defaultOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(isAuthenticated && token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  };

  const response = await fetch("/api" + path, defaultOptions);

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the data.");
    error.status = response.status;
    error.info = await response.json();
    throw error;
  }

  return response.json();
};
