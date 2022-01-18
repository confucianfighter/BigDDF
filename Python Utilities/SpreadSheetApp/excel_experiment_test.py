from GraphQL.graph_ql import *
from excel_experiment import *
import os
import subprocess

query: str = '''
   query
   {
       pools(first: 40, orderBy:volumeUSD, orderDirection:desc)
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
""""""

query_result = run_query(query)
subprocess = subprocess.Popen("echo ~/Documents/DDF/ExcelExports/GQLResults.xls", shell=True, stdout=subprocess.PIPE)
file_path = subprocess.stdout.read()
file_path = file_path.decode('utf-8')
file_path = file_path.strip()
export_to_excel(query_result, file_path)
os.system(f"open -a 'Microsoft Excel' {file_path}")
