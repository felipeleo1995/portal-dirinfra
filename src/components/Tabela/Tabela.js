import React, { useState } from "react";
import PropTypes from "prop-types";

// ...

Tabela.propTypes = {
	tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
};


function Tabela({ tableData }) {
	const [data, setData] = useState(tableData);

	const handleCellChange = (rowIndex, colIndex, newValue) => {
		const newData = data.map((row, i) =>
			i === rowIndex ? { ...row, [colIndex]: newValue } : row
		);
		setData(newData);
		// Envie uma requisição para atualizar os dados no banco de dados aqui usando a função OnChange
	};

	return (
		<table>
			<thead>
				<tr>
					{Object.keys(data[0]).map((key) => (
						<th key={key}>{key}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{data.map((row, rowIndex) => (
					<tr key={rowIndex}>
						{Object.values(row).map((cellValue, colIndex) => (
							<td key={colIndex}>
								<input
									type="text"
									value={cellValue}
									onChange={(e) =>
										handleCellChange(rowIndex, colIndex, e.target.value)
									}
								/>
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
}

export default Tabela;
