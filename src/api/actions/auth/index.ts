import express from 'express'

import { NOTIFICATION_TYPE, API } from 'shared/constants'
import { ERROR, SUCCESS } from 'shared/constants/localeMessages'
import { catchErrors } from 'api/helpers/errorHandler'
import { unsetSession } from 'api/helpers/auth'

import { validateLoginData, validateResetData, validateSignupData } from './validate'
import { handleLogIn, handleResetPass, handleSignUp } from './handlers'

export default () => {
  const router = express.Router()
  router.post('/:action', catchErrors(async (req, res) => {
    const { params: { action }, body: { inputs } } = req

    if (action === API.AUTH_SIGN_UP) {
      const valid = await validateSignupData(inputs)
      if (!valid) {
        res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.INVALID_DATA] })
        return
      }

      await handleSignUp(inputs, req, res)
      return
    }

    res.status(404).send('Not Found')
  }))

  router.put('/:action', catchErrors(async (req: any, res) => {
    const { params: { action }, body: { inputs, locale } } = req

    switch (action) {
      case API.AUTH_LOG_IN: {
        const valid = await validateLoginData(inputs)
        if (!valid) {
          res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.INVALID_DATA] })
          return
        }

        await handleLogIn(inputs, req, res)
        return
      }
      case API.AUTH_RESET: {
        const valid = await validateResetData(inputs)
        if (!valid) {
          res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.INVALID_DATA] })
          return
        }

        await handleResetPass(inputs, req.session?.locale ?? locale, req, res)
        return
      }
      case API.AUTH_SIGN_OUT:
        unsetSession(req, res)
        res.status(200).send({ [NOTIFICATION_TYPE.SUCCESSES]: [SUCCESS.SIGNED_OUT] })
        return
      default:
        res.status(404).send('Not Found')
    }
  }))

  router.delete('/:action', catchErrors(async (req, res) => {
    const { params: { action } } = req

    if (action === API.AUTH_DELETE) {
      // todo: Finish within separate issue when logging off is implemented
      // todo: Also implement activity associated with removing user from all households and deleting all his households

      res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.ACTION_ERROR] })
      return
    }

    res.status(404).send('Not Found')
  }))

  return router
}
