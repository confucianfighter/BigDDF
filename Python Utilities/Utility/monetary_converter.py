def eth_to_wei(eth: float) -> float:
    return eth * 10 ** 18
""""""

def wei_to_eth(wei: float) -> float:
    return wei * 10 ** -18
""""""

def gwei_to_wei(gwei: float) -> float:
    return gwei * 10 ** 9
""""""

def usd_to_eth(eth:float) -> float:
    return 4000
""""""

def gwei_to_usd(gwei: float) -> float:
    return usd_to_eth(1) * 10 ** -9
""""""