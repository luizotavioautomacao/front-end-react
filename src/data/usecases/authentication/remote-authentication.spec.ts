import { HttpPostClient } from "../../protocols/http/http-post-client";
import { HttpClientSpy } from "../../test/mock-http-client";
import { RemoteAuthentication } from "./remote-authentication";

type SutTypes = {
    sut: RemoteAuthentication,
    httpPostClientSpy: HttpClientSpy
}

const makeSut = (url: string = 'any_url'): SutTypes => {
    const httpPostClientSpy = new HttpClientSpy()
    const sut = new RemoteAuthentication(url, httpPostClientSpy)
    return {
        sut,
        httpPostClientSpy
    }
}

describe('RemoteAuthentication', () => {

    test('Should call HttpClient with correct url', async () => {

        const url = 'other_url'
        const { sut, httpPostClientSpy } = makeSut(url)
        await sut.auth()
        expect(httpPostClientSpy.url).toBe(url)
    });

});