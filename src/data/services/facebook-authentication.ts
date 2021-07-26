import { FacebookAuthentication } from '@/domain/features'
import { AuthenticationError } from '@/domain/errors/authentication'
import { LoadFacebookUserApi } from '@/data/contracts/apis'
import { LoadUserAccountRepository, CreateFacebookAccountRepository } from '@/data/contracts/repos/user-accounts'

export class FacebookAuthenticationService {
  constructor (
    private readonly facebookApi: LoadFacebookUserApi,
    private readonly userAccountRepo: LoadUserAccountRepository & CreateFacebookAccountRepository
  ) {}

  async perform ({ token }: FacebookAuthentication.Params): Promise<AuthenticationError> {
    const fbData = await this.facebookApi.loadUser({ token })

    if (fbData !== undefined) {
      await this.userAccountRepo.load({ email: fbData.email })
      await this.userAccountRepo.createFromFacebook(fbData)
    }

    return new AuthenticationError()
  }
}
