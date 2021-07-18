import { FacebookAuthentication } from '@/domain/features'
import { AuthenticationError } from '@/domain/errors/authentication'
import { LoadFacebookUserApi } from '@/data/contracts/apis'

export class FacebookAuthenticationService {
  constructor (
    private readonly loadFacebookUserApi: LoadFacebookUserApi
  ) {}

  async perform ({ token }: FacebookAuthentication.Params): Promise<AuthenticationError> {
    await this.loadFacebookUserApi.loadUser({ token })
    return new AuthenticationError()
  }
}
