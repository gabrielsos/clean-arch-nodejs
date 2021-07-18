import { FacebookAuthentication } from './../../../src/domain/features/facebook-authentication'
class FacebookAuthenticationService {
  constructor (
    private readonly loadFacebookUserApi: LoadFacebookUserApi
  ) {}

  async perform ({ token }: FacebookAuthentication.Params): Promise<void> {
    await this.loadFacebookUserApi.loadUser({ token })
  }
}

interface LoadFacebookUserApi {
  loadUser: (params: LoadFacebookUserApi.Params) => Promise<void>
}

namespace LoadFacebookUserApi {
  export type Params = {
    token: string
  }
}

class LoadFacebookUserApiSpy implements LoadFacebookUserApi {
  token?: string
  async loadUser ({ token }: LoadFacebookUserApi.Params): Promise<void> {
    this.token = token
  }
}

describe('FacebookAuthenticationService', () => {
  it('should call LoadFacebookUserApi with correct parameters', async () => {
    const loadFacebookUserApi = new LoadFacebookUserApiSpy()
    const sut = new FacebookAuthenticationService(loadFacebookUserApi)

    await sut.perform({ token: 'any_token' })

    expect(loadFacebookUserApi.token).toBe('any_token')
  })
})
