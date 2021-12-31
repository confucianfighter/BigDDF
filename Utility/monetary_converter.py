def eth_to_wei(eth: float) -> float:
    return eth * 10 ** 18


def wei_to_eth(wei: float) -> float:
    return wei * 10 ** -18
