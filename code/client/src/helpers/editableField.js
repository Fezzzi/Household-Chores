import PropTypes from 'prop-types'

export const editableFieldProps = {
  name: PropTypes.string.isRequired,
  edited: PropTypes.bool,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  setFormState: PropTypes.func.isRequired,
  isFormValidFunc: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]),
}
