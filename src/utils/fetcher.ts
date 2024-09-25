import useAuthStore from "../store/auth.store";

export const apiFetcher = async (path: string, options = {}) => {
  const { access_token, isAuthenticated } = useAuthStore.getState();
  const baseUrl = import.meta.env.VITE_API_BASE_URL.replace(/\/+$/, "");
  const defaultOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(isAuthenticated && access_token
        ? { Authorization: `Bearer ${access_token}` }
        : {}),
    },
    ...options,
  };

  const response = await fetch(baseUrl + path, defaultOptions);

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message ?? data.error ?? "An error occurred");
  }

  return await response.json();
};
