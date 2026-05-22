import { M as useAuth } from './server.mjs';

function useApi() {
  const { token } = useAuth();
  return $fetch.create({
    onRequest({ options }) {
      if (token.value) {
        const headers = new Headers(options.headers);
        headers.set("Authorization", `Bearer ${token.value}`);
        options.headers = headers;
      }
    }
  });
}

export { useApi as u };
//# sourceMappingURL=useApi-DoKmTMMO.mjs.map
