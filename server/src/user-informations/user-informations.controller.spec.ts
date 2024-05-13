import { Test, TestingModule } from '@nestjs/testing'
import { UserInformationsController } from './user-informations.controller'

describe('UserInformationsController', () => {
  let controller: UserInformationsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserInformationsController],
    }).compile()

    controller = module.get<UserInformationsController>(
      UserInformationsController,
    )
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
