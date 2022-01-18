from GraphQL.graph_ql import *
from flatdict import FlatDict
import sys
import xlwt

# data should be a list of rows. Rows are keyed dictionaries,
# the dictionary entries possibly containing lists:
def flatten_dict(data: list) -> list:
    flat_results = []
    for row in data:
        flat_row = FlatDict(row, '->')
        flat_results.append(flat_row)
    return flat_results

# query_json should be raw query json results.
def export_to_excel(query_json:dict, file_path:str):
    for key in query_json:
        data = query_json[key]
        data = flatten_dict(data)
        book = xlwt.Workbook(encoding="utf-8")
        sheet = book.add_sheet(key)

        # go ahead and make column names from first list item:
        column_names = []
        for key in data[0].keys():
            column_names.append(key)

        # Add column names to the sheet:
        for i, col_name in enumerate(column_names):
            sheet.write(0,i, col_name)
        # add the entries
        for r, row in enumerate(data):
            for c, key in enumerate(row.keys()):
                print(f"row {r} {key}: {row[key]}")
                sheet.write(r+1,c,row[key])
        # Freeze headers
        sheet.set_horz_split_pos(1)
        sheet.set_vert_split_pos(1)
        sheet.panes_frozen = True
        sheet.remove_splits = True

    #Export!
    book.save(file_path)

