import { UniTable } from "../../../components/table/UniTable";
import { useMemo } from "react";
import { SizeColumnsToFitGridStrategy } from "@ag-grid-community/core";

interface TableParametersProps {
  tableParameters: any[];
}

export const TableParameters = ({ tableParameters }: TableParametersProps) => {
  const columnDefs = useMemo(() => {
    if (!tableParameters || tableParameters.length === 0) return [];
    return Object.keys(tableParameters[0]).map((key) => ({
      headerName: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize headers
      field: key,
      autoHeight: true,
      wrapText: true,
      flex: 1,
    }));
  }, [tableParameters]);

  const autoSizeStrategy: SizeColumnsToFitGridStrategy = {
    type: "fitGridWidth",
  };

  return (
    <div className="h-full uni-table-parameters">
      <UniTable
        columnDefs={columnDefs}
        rowData={tableParameters}
        animateRows={true}
        autoSizeStrategy={autoSizeStrategy}
        className="ag-theme-alpine"
      />
    </div>
  );
};

export default TableParameters;
