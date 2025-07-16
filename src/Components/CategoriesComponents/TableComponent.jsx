const TableComponent = ({ data = [], columns = [] }) => {
  return (
    <table className="table w-100 user-table" dir="rtl">
      <thead>
        <tr>
          {columns.map((col, idx) => (
            <th key={col.accessor || idx}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={row.id || i}>
            {columns.map((col, idx) => (
              <td key={col.accessor || idx}>
                {col.render
                  ? col.render(row[col.accessor], row)
                  : row[col.accessor]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default TableComponent;
