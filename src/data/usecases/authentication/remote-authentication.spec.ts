import { mockAuthentication } from "../../../domain/test/mock-authentication";
import { InvalidCredentialsError } from "../../../domain/errors/invalid-credencials-error";
import { HttpClientSpy } from "../../../data/test/mock-http-client";
import { RemoteAuthentication } from "./../../../data/usecases/authentication/remote-authentication";
import { faker } from '@faker-js/faker';
import { HttpStatusCode } from "../../protocols/http/http-response";

type SutTypes = {
    sut: RemoteAuthentication,
    httpPostClientSpy: HttpClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
    const httpPostClientSpy = new HttpClientSpy()
    const sut = new RemoteAuthentication(url, httpPostClientSpy)
    return {
        sut,
        httpPostClientSpy
    }
}

describe('RemoteAuthentication', () => {

    test('Should call HttpClient with correct url', async () => {
        const url = faker.internet.url()
        const { sut, httpPostClientSpy } = makeSut(url)
        await sut.auth(mockAuthentication())
        expect(httpPostClientSpy.url).toBe(url)
    });

    test('Should call HttpClient with correct body', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        const authenticationParams = mockAuthentication()
        await sut.auth(authenticationParams)
        expect(httpPostClientSpy.body).toEqual(authenticationParams)
    });

    test('Should throw InvalidCredentialsError if HttpPostClient with returns 401', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.unauthorized
        }
        const promise = sut.auth(mockAuthentication())
        await expect(promise).rejects.toThrow(new InvalidCredentialsError())
    });

});