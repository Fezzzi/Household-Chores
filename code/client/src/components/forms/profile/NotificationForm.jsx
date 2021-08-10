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

// todo: New shape of notifications needs to be tested!
const NOTIFICATION_GROUPS = ['connections', 'households']

const NotificationForm = ({ data, onSubmit }) => {
  const grouppedData = data
    ? Object.entries(data).reduce((acc, [key, value]) => {
      for (const group of NOTIFICATION_GROUPS) {
        if (key.match(new RegExp(`^${group}[A-Z]`))) {
          acc[group][key] = value
          return acc
        }
      }
      acc.general[key] = value
      return acc
    }, { general: [], connections: [], households: [] })
    : {}

  const {
    submitMessage,
    isFormValid,
    isFormSending,
    inputs,
    setFormState,
  } = useFormState([data])

  const { general, connections, households } = grouppedData

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

  const getNotificationsBlock = (group, groupHeadline) => (
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
      {getNotificationsBlock(connections, FORM.CONNECTIONS)}
      {getNotificationsBlock(households, FORM.HOUSEHOLDS)}
    </>
  )
}

NotificationForm.propTypes = {
  data: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default NotificationForm
