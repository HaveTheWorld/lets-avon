import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'
import Icon from '@/components/Elements/Icon'

const InputFile = ({ files = [], onChange, isRequired }) => {
	const isEmpty = !files.length
	const status = isEmpty ? 'Файлы не выбраны' : `Выбрано файлов: ${files.length}`
	const error = isRequired && isEmpty

	return (
		<div className="field">
			<div className="control">
				<div className="file has-name">
					<label className="file-label">
						<input className="file-input" type="file" multiple onChange={onChange} />
						<span className="file-cta">
							<Icon icon={['fas', 'upload']} />
							<span className="file-label">Выбрать файлы</span>
						</span>
						<span className={cls('file-name', { 'has-text-danger': error })}>{status}</span>
					</label>
				</div>
			</div>
		</div>
	)
}

InputFile.propTypes = {
	
}

export default InputFile