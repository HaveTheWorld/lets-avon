import React from 'react'
import Section from '@/components/Elements/Section'
import { Link } from '@/libs/routes'

const Catalogs = () => {
	return (
		<Section title="Каталоги">
			<Link route="/catalogs/avon">
				<a>Avon</a>
			</Link>
			<Link route="/catalogs/focus">
				<a>Focus</a>
			</Link>
		</Section>
	)
}

export default Catalogs