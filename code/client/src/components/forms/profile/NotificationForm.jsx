import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Save } from '@material-ui/icons'

import { useFormState, useUpdateHandler } from 'clientSrc/helpers/form'
import { NotificationGroupBox, SectionHeadline } from 'clientSrc/styles/blocks/settings'
import { TableBox, TableHeaderBox, TableHeaderCell } from 'clientSrc/styles/blocks/table'
import { INPUT_TYPE } from 'shared/constants'
import { FORM } from 'shared/constants/localeMessages'

import { LocaleText, Input } from '../../common'
import { SimpleFloatingElement } from '../../portals'

const NOTIFICATION_GROUPS = ['connection', 'household']

const NotificationForm = ({ data, onSubmit }) => {
  if (!data) {
    return null
  }

  const { general, connection, household } = Object.entries(data).reduce((acc, [key, value]) => {
    for (const group of NOTIFICATION_GROUPS) {
      if (key.match(new RegExp(`^${group}[A-Z]`))) {
        acc[group][key] = value
        return acc
      }
    }

    acc.general[key] = value
    return acc
  }, { general: {}, connection: {}, household: {} })

  const {
    submitMessage,
    isFormValid,
    isFormSending,
    inputs,
    setFormState,
  } = useFormState([data])

  const filteredGeneral = useMemo(() => {
    const filtered = { ...general }
    if (filtered) {
      const isMobile = false
      if (!isMobile) {
        delete filtered.mobileNotifications
      }
    }
    return filtered
  }, [general])

  const disableOthers = useMemo(() =>
    Object.entries(filteredGeneral).map(([key, value]) =>
      inputs[key] !== undefined
        ? !inputs[key]
        : !value
    ).some(Boolean)
  , [inputs, filteredGeneral])

  const getNotificationsBlock = (group, groupHeadline, disabled = false) => (
    <TableBox disabled={disabled}>
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
            hasDefaultValue
            onUpdate={useUpdateHandler(setFormState)}
          />
        ))}
      </NotificationGroupBox>
    </TableBox>
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
      {getNotificationsBlock(connection, FORM.CONNECTIONS, disableOthers)}
      {getNotificationsBlock(household, FORM.HOUSEHOLDS, disableOthers)}
    </>
  )
}

NotificationForm.propTypes = {
  data: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default NotificationForm
