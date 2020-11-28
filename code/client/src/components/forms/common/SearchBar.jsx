import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { SearchBarWrapper } from 'clientSrc/styles/blocks/settings'
import { SUBMIT_TIMEOUT } from 'clientSrc/constants/common'
import { COMMON } from 'shared/constants/localeMessages'
import * as InputTypes from 'shared/constants/inputTypes'

import LocaleText from '../../common/LocaleText'
import PrimaryButton from './PrimaryButton'
import Input from './Input'

const SearchBar = ({ searchQuery }) => {
  const [timer, setTimer] = useState(null)
  const [query, setQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [submitMessage, setSubmitMessage] = useState(COMMON.SEARCH)

  useEffect(() => () => clearTimeout(timer))

  const handleClick = e => {
    e.preventDefault()
    setIsSearching(true)
    setSubmitMessage(COMMON.SEARCHING)
    searchQuery(query)

    setTimer(setTimeout(
      () => {
        setIsSearching(false)
        setSubmitMessage(COMMON.SEARCH)
      }), SUBMIT_TIMEOUT)
  }

  return (
    <SearchBarWrapper>
      <Input
        type={InputTypes.TEXT}
        name="query"
        updateInput={(_, value) => setQuery(value)}
        inline
        message={COMMON.SEARCH}
      />
      <PrimaryButton
        disabled={query.length === 0 || isSearching}
        inline
        clickHandler={handleClick}
        margin="3px 5px 3px -10px"
      >
        <LocaleText message={submitMessage} />
      </PrimaryButton>
    </SearchBarWrapper>
  )
}

SearchBar.propTypes = {
  searchQuery: PropTypes.func.isRequired,
}

export default SearchBar
