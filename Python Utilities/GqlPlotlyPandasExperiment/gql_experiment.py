from xml.dom.minidom import Document

import pandas as pd
import flatdict as flatdict
import plotly.express as px
from gql import gql, Client
from gql.transport.requests import RequestsHTTPTransport
from TestUtils.timer_decorator import time_this_function

@time_this_function
def run_query(query: str) -> list:
    sample_transport = RequestsHTTPTransport(
        url='https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',
        verify=True,
        retries=3
    )
    client = Client(transport=sample_transport)
    query_doc: Document = gql(query)
    return client.execute(query_doc)

def print_via_pandas(list_of_dicts: list) -> None:
    pairs = []
    for i in response['pairs']:
        pairs.append(
            [
                i['token0']['symbol'],
                i['token1']['symbol'],
                i['volumeUSD']
            ])

    df = pd.DataFrame(pairs)
    pd.set_option('display.max_rows',None)
    pd.set_option('display.max_colwidth', 18)
    df[2] = df[2].astype(float)
    df[2] = df[2].apply(lambda x: "${:,.2f}".format((x)))
    df.columns = ['Token1', 'Token2','Volume-USD']
    df['Pair'] = df['Token1'] + '-' + df['Token2']
    print(df.head(n=1000))


query_str = '''
query
{
    pairs(first: 5, orderBy:volumeUSD, orderDirection:desc)
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
    }    
}
'''
response = run_query(query_str)
print_via_pandas(response)



