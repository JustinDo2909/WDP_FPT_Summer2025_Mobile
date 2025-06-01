import { get, map } from "lodash";
import React from "react";
import {
  GestureResponderEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";


type Props<T> = {
  data: T[];
  header? : React.ReactElement;
  title?: React.ReactElement;
  icon?: React.ReactElement;
  columns: RTblColumn<T>[];
  onRow?(record: T): {
    onPress?(e: GestureResponderEvent): void;
  };
  sort?: React.ReactNode;
};

declare global {
  type RTblColumn<T> = {
    key: keyof T;
    label?: React.ReactElement;
    width?: number;
    render: (args: {
      value: any;
      row: T;
      outRange?: boolean;
    }) => React.ReactNode;
  };
}

export function CustomTable<T>({
  columns,
  data,
  onRow,
    header,
}: Props<T>) {
  return (
    <View style={styles.container}>
      {header && header}
      <ScrollView>
        {data.length > 0 ? (
          map(data, (row, rowIndex) => {
            const onRowEvent = onRow?.(row); 
            return (
              <TouchableOpacity
                key={rowIndex}
                style={styles.tableRow}
                onPress={(e) => {
                  onRowEvent?.onPress?.(e);
                }}
              >
                {map(columns, (col) => (
                  <View
                    key={String(col?.key)}
                    style={[
                      styles.cell,
                      col.width != null
                        ? { width: col.width, flex: 0 }
                        : { flex: 1 },
                    ]}
                  >
                    {col?.render?.({
                      value: get(row, col?.key, ""),
                      row,
                      outRange: get(row, "outRange"),
                    })}
                  </View>
                ))}
              </TouchableOpacity>
            );
          })
        ) : (
          <View style={styles.noResults}>
            <Text style={styles.noResultsText}>No results found</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
    marginVertical: 10,
    borderRightColor: "red",
    maxHeight: 400,
    overflow: "scroll",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
    color: "#0070f3",
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 8,
    marginRight: 10,
    minWidth: 150,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  switchLabel: {
    marginRight: 6,
    fontSize: 13,
    color: "#333",
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 8,
    backgroundColor: "#f5f5f5",
  },
  headerCell: {
    paddingHorizontal: 8,
    flex: 1,
  },
  headerText: {
    fontWeight: "bold",
    color: "#333",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingVertical: 12,
  },
  cell: {
    paddingHorizontal: 8,
    flex: 1,
    justifyContent: "center",
  },
  cellText: {
    fontSize: 14,
    color: "#444",
  },
  actionCell: {
    flexDirection: "row",
    paddingHorizontal: 8,
    justifyContent: "flex-end",
    alignItems: "center",
    minWidth: 150,
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginLeft: 8,
  },
  updateButton: {
    backgroundColor: "#4CAF50",
  },
  deleteButton: {
    backgroundColor: "#F44336",
  },
  actionButtonText: {
    color: "white",
    fontSize: 12,
  },
  noResults: {
    padding: 16,
    alignItems: "center",
  },
  noResultsText: {
    color: "#666",
  },
  highlight: {
    color: "red",
  },
});
