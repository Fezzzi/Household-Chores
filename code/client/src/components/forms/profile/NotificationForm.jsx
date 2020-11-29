import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Save } from '@material-ui/icons'

import { useFormState, useUpdateHandler } from 'clientSrc/helpers/form'
import { NotificationGroupBox, SectionHeadline } from 'clientSrc/styles/blocks/settings'
import { TableBox, TableHeaderBox, TableHeaderCell } from 'clientSrc/styles/blocks/table'
import { INPUT_TYPE } from 'shared/constants'
import { FORM } from 'shared/constants/localeMessages'
import { NOTIFICATIONS } from 'shared/constants/settingsDataKeys'

import Input from '../../common/Input'
import LocaleText from '../../common/LocaleText'
import { SimpleFloatingElement } from '../../portals'

const NotificationForm = ({ data, onSubmit }) => {
  const {
    submitMessage,
    isFormValid,
    isFormSending,
    inputs,
    setFormState,
  } = useFormState(data)

  const {
    [NOTIFICATIONS.GENERAL]: general,
    [NOTIFICATIONS.CONNECTIONS]: connections,
    [NOTIFICATIONS.HOUSEHOLDS]: households,
  } = data

  const filteredGeneral = useMemo(() => {
    const filtered = { ...general }
    if (filtered) {
      const isMobile = false
      if (isMobile) {
        delete filtered.browser_notifications
      } else {
        delete filtered.mobile_notifications
      }
    }
    return filtered
  }, [general])

  const getNotificationsBlock = (group, groupHeadline) => (
    <>
      <TableBox>
        {groupHeadline && (
          <TableHeaderBox>
            <TableHeaderCell>
              <LocaleText message={groupHeadline} />
            </TableHeaderCell>
          </TableHeaderBox>
        )}
        <NotificationGroupBox>
          {group && Object.entries(group).map(([name, value]) => (
            <Input
              key={name}
              type={INPUT_TYPE.BOOL}
              name={name}
              label={`form.${name}`}
              value={Boolean(value)}
              onUpdate={useUpdateHandler(name, setFormState, undefined, Boolean(value))}
            />
          ))}
        </NotificationGroupBox>
      </TableBox>
    </>
  )

  return (
    <>
      {Object.keys(inputs).length > 0 && (
        <SimpleFloatingElement
          message={submitMessage}
          sending={isFormSending}
          enabled={isFormValid}
          icon={<Save />}
          onClick={() => onSubmit(inputs, setFormState)}
        />
      )}

      <SectionHeadline first>
        <LocaleText message={FORM.NOTIFICATIONS} />
      </SectionHeadline>

      {getNotificationsBlock(filteredGeneral)}
      {getNotificationsBlock(connections, FORM.CONNECTIONS)}
      {getNotificationsBlock(households, FORM.HOUSEHOLDS)}
    </>
  )
}

NotificationForm.propTypes = {
  data: PropTypes.shape({
    [NOTIFICATIONS.GENERAL]: PropTypes.object,
    [NOTIFICATIONS.CONNECTIONS]: PropTypes.object,
    [NOTIFICATIONS.HOUSEHOLDS]: PropTypes.object,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default NotificationForm
