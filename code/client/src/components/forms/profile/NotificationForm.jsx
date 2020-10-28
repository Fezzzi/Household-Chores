import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Save } from '@material-ui/icons';

import { handlerWrapper, updateHandler } from 'clientSrc/helpers/form';
import { SUBMIT_TIMEOUT } from 'clientSrc/constants/common';
import { NotificationGroupBox, SectionHeadline } from 'clientSrc/styles/blocks/settings';
import LocaleText from 'clientSrc/components/common/LocaleText';
import { TableBox, TableHeaderBox, TableHeaderCell } from 'clientSrc/styles/blocks/table';
import { COMMON, FORM } from 'shared/constants/localeMessages';
import * as InputTypes from 'shared/constants/inputTypes';

import Input from '../common/Input';
import { SimpleFloatingElement } from '../../portals';

const NotificationForm = ({ data }) => {
  const [timer, setTimer] = useState(null);
  const [state, setState] = useState({
    submitMessage: FORM.SAVE,
    isFormValid: true,
    isFormSending: false,
    inputs: {},
    errors: {},
  });

  useEffect(() => () => timer && clearTimeout(timer), []);

  // todo: Replace all those handleClick all around with some handy helper function
  const handleClick = handlerWrapper(() => {
    setState(prevState => ({
      ...prevState,
      isFormSending: true,
      submitMessage: COMMON.SENDING,
    }));

    setTimer(setTimeout(
      () => setState && setState(prevState => ({
        ...prevState,
        isFormSending: false,
        submitMessage: FORM.SAVE,
      })), SUBMIT_TIMEOUT));
  });

  const { connections, households } = data;
  const { submitMessage, isFormValid, isFormSending, inputs } = state;

  const getNotificationsBlock = (group, groupHeadline) => (
    <>
      <TableBox>
        <TableHeaderBox>
          <TableHeaderCell>
            <LocaleText message={groupHeadline} />
          </TableHeaderCell>
        </TableHeaderBox>
        <NotificationGroupBox>
          {group && group.map(({ name, value }) => (
            <Input
              key={name}
              type={InputTypes.BOOL}
              name={name}
              label={name}
              placeholder={value}
              updateInput={updateHandler(name, setState, undefined, value)}
            />
          ))}
        </NotificationGroupBox>
      </TableBox>
    </>
  );

  return (
    <>
      {Object.keys(inputs).length > 0 && (
        <SimpleFloatingElement
          message={submitMessage}
          sending={isFormSending}
          enabled={isFormValid}
          icon={<Save />}
          onClick={handleClick}
        />
      )}

      <SectionHeadline first>
        <LocaleText message={FORM.EMAIL_NOTIFICATIONS} />
      </SectionHeadline>

      {getNotificationsBlock(connections, FORM.CONNECTIONS)}
      {getNotificationsBlock(households, FORM.HOUSEHOLDS)}
    </>
  );
};

NotificationForm.propTypes = {
  data: PropTypes.shape({
    connections: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.bool.isRequired,
    })),
    households: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.bool.isRequired,
    })),
  }).isRequired,
};

export default NotificationForm;
