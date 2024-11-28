import apiClient from "./apiClient";

interface Entity {
    id: number;
}

class HttpService {
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    getAll<T>() {
        const controller = new AbortController();

        const request = apiClient.get<T>(this.endpoint, {
            signal: controller.signal,
            withCredentials: true,
        });
        return { request, cancel: () => controller.abort() };
    }

    getWithParams<T, P>(params: T){
        const controller = new AbortController();

        const request = apiClient.get<P>(this.endpoint, {
            signal: controller.signal,
            withCredentials: true,
            params: {
                ...params
            }
        });

        return {request, cancel: () => controller.abort()};
    }

    get(id: number) {
        const controller = new AbortController();

        const request = apiClient.get(this.endpoint + "/" + id, {
            signal: controller.signal,
            withCredentials: true,
        });

        return {request, cancel: () => controller.abort()};
    }

    delete(id: number) {
        return apiClient.delete(this.endpoint + "/" + id, {
            withCredentials: true,
        });
    }

    create<T>(entity: T) {
        return apiClient.post(this.endpoint, entity, {
            withCredentials: true,
        });
    }

    update<T extends Entity>(entity: T) {
        const request = apiClient.patch(this.endpoint + "/" + entity.id, entity, {
            withCredentials: true,
        });

        return request;
    }

}

const httpService = (endpoint: string) => new HttpService(endpoint);

export default httpService;
