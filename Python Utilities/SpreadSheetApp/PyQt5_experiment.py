from PyQt5.QtWidgets import QMainWindow, QApplication, QWidget, QAction, QTableWidget, QTableWidgetItem, QVBoxLayout
from PyQt5.QtGui import QIcon
from PyQt5.QtCore import pyqtSlot
from GraphQL.graph_ql import *
from flatdict import FlatDict
import sys

class TableView(QTableWidget):
    def __init__(self, data, *args):
        QTableWidget.__init__(self, *args)
        self.data = data
        self.setData()
        self.resizeColumnsToContents()
        self.resizeRowsToContents()
    ###

    def setData(self):
        flat_results = []
        for row in self.data:
            flat_row = FlatDict(row, '->')
            flat_results.append(flat_row)
        ###
        """go ahead and make column names from first list item"""
        column_names = []
        for key in flat_results[0].keys():
            column_names.append(key)
        ###
        """add the labels"""
        self.setHorizontalHeaderLabels(column_names)
        """add the entries"""
        for r, row in enumerate(flat_results):
            for c, key in enumerate(row.keys()):
                new_item = QTableWidgetItem(row[key])
                self.setItem(r, c, new_item)
        ###

def main(args):
    query: str = '''
        query
        {
            pools(first: 1000, orderBy:volumeUSD, orderDirection:desc)
            {
                volumeUSD
                token0
                {
                    symbol
                }
                token1
                {
                    symbol
                }
                token0Price
                token1Price
                txCount
                liquidityProviderCount
                
            }    
        }
    '''
    ##<- query string
    query_result = run_query(query)
    app = QApplication(args)
    table = TableView(query_result['pools'],1000,20)
    table.show()
    sys.exit(app.exec_())
##<- main


if __name__ == "__main__":
    main(sys.argv)
####
