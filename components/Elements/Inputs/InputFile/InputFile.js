import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'
import Icon from '@/components/Elements/Icon'

const InputFile = ({ input, meta, multiple }) => {
	const isEmpty = !input.value || !input.value.length
	const status = isEmpty ? 'Файлы не выбраны' : `Выбрано файлов: ${input.value.length}`
	const showError = meta.touched && meta.invalid
	
	const onChange = event => {
		input.onChange(event.target.files)
	}

	delete input.value
	
	return (
		<div className="field">
			<div className="control">
				<div className="file has-name">
					<label className="file-label">
						<input
							{...input}
							className="file-input"
							type="file"
							multiple={multiple}
							onChange={onChange}
						/>
						<span className="file-cta">
							<Icon icon={['fas', 'upload']} />
							<span className="file-label">Выбрать файлы</span>
						</span>
						<span className={cls('file-name', { 'has-text-danger': showError })}>{status}</span>
					</label>
				</div>
			</div>
		</div>
	)
}

InputFile.propTypes = {
	
}

export default InputFile