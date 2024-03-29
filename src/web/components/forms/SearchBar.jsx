import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { COMMON } from 'shared/constants/localeMessages'
import { INPUT_TYPE } from 'shared/constants'

import { SearchBarWrapper } from '../../styles/blocks/settings'
import { SUBMIT_TIMEOUT } from '../../constants'
import { LocaleText, PrimaryButton, Input } from '../common'

const SearchBar = ({ onSearch }) => {
  const [timer, setTimer] = useState(null)
  const [query, setQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [submitMessage, setSubmitMessage] = useState(COMMON.SEARCH)

  useEffect(() => () => clearTimeout(timer))

  const handleClick = e => {
    e.preventDefault()
    setIsSearching(true)
    setSubmitMessage(COMMON.SEARCHING)
    onSearch(query)

    setTimer(setTimeout(
      () => {
        setIsSearching(false)
        setSubmitMessage(COMMON.SEARCH)
      }), SUBMIT_TIMEOUT)
  }

  return (
    <SearchBarWrapper>
      <Input
        type={INPUT_TYPE.TEXT}
        name="query"
        onUpdate={(_, __, value) => setQuery(value)}
        inline
        value={COMMON.SEARCH}
      />
      <PrimaryButton
        disabled={query.length === 0 || isSearching}
        inline
        onClick={handleClick}
        margin="3px 20px"
      >
        <LocaleText message={submitMessage} />
      </PrimaryButton>
    </SearchBarWrapper>
  )
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
}

export default SearchBar
