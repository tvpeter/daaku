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

        const request = apiClient.get<T[]>(this.endpoint, {
            signal: controller.signal,
            withCredentials: true,
        });
        return { request, cancel: () => controller.abort() };
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
        const controller = new AbortController();

        const request = apiClient.delete(this.endpoint + "/" + id, {
            signal: controller.signal,
            withCredentials: true,
        });

        return {request, cancel: () => controller.abort()};

    }

    create<T>(entity: T) {
        const controller = new AbortController();
        const request = apiClient.post(this.endpoint, entity, {
            signal: controller.signal,
            withCredentials: true,
        });

        return { request, cancel: () => controller.abort()};
    }

    update<T extends Entity>(entity: T) {
        const controller = new AbortController();
        const request = apiClient.patch(this.endpoint + "/" + entity.id, entity, {
            signal: controller.signal,
            withCredentials: true,
        });

        return { request, cancel: () => controller.abort()};
    }

}

const httpService = (endpoint: string) => new HttpService(endpoint);

export default httpService;
