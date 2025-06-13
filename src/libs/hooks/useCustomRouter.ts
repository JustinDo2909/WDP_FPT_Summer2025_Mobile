import { useRouter } from "expo-router";

interface NavigateOptions {
  pathSegments?: (string | number)[];
  params?: Record<string, string | number | boolean>;
}

export const useCustomRouter = () => {
  const router = useRouter();

  const navigate = ({
    pathSegments = [],
    params = {},
  }: NavigateOptions) => {
    const path = "/" + pathSegments.map(String).join("/");

    const queryParams = new URLSearchParams({ path, ...params }).toString();
    router.push(`/root/dynamic?${queryParams}`);
  };

  return { navigate };
};
