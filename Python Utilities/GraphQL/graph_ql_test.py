from graph_ql import *
query_str = '''
query
{
    pools(first: 5, orderBy:volumeUSD, orderDirection:desc)
    {
        liquidityProviderCount
        volumeUSD
        token0
        {
            symbol
        }
        token0Price
        token1
        {
            symbol
        }
        token1Price
    }    
}
'''
response = run_query(query_str)
print(response)
print_via_pandas(response)