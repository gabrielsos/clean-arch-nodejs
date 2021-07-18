import { LoadFacebookUserApi } from '@/data/contracts/apis/facebook'
import { FacebookAuthenticationService } from '@/data/services'

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
