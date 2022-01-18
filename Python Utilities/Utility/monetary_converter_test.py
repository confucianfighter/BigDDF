from monetary_converter import *

def test():
    print(eth_to_wei(1))
    print(f"115 gas in wei is {gwei_to_wei(115)}")
    print(usd_to_eth(1))
    print(f"Gas to 115 usd is {gwei_to_usd(115)}")
####

test()