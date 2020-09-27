import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { InputRow } from 'clientSrc/styles/blocks/form';
import LocaleText from 'clientSrc/components/common/LocaleText';
import * as InputTypes from 'shared/constants/inputTypes';

import { handlerWrapper } from 'clientSrc/helpers/form';
import { COMMON } from 'shared/constants/localeMessages';
import { SUBMIT_TIMEOUT } from 'clientSrc/constants/common';
import PrimaryButton from './PrimaryButton';
import Input from './Input';

const SearchBar = ({ searchQuery }) => {
  const [timer, setTimer] = useState(null);
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(COMMON.SEARCH);

  useEffect(() => () => clearTimeout(timer));

  const handleClick = handlerWrapper(() => {
    setIsSearching(true);
    setSubmitMessage(COMMON.SEARCHING);
    searchQuery(query);

    setTimer(setTimeout(
      () => {
        setIsSearching(false);
        setSubmitMessage(COMMON.SEARCH);
      }), SUBMIT_TIMEOUT);
  });

  return (
    <>
      <InputRow>
        <Input
          type={InputTypes.TEXT}
          name="query"
          updateInput={(_, value) => setQuery(value)}
          inline
          message={COMMON.SEARCH}
        />
        <PrimaryButton disabled={query.length === 0 || isSearching} inline clickHandler={handleClick} margin="3px 5px">
          <LocaleText message={submitMessage} />
        </PrimaryButton>
      </InputRow>
    </>
  );
};

SearchBar.propTypes = {
  searchQuery: PropTypes.func.isRequired,
};

export default SearchBar;
