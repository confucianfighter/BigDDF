from uniswap import Uniswap

address = None         # or None if you're not going to make transactions
private_key = None  # or None if you're not going to make transactions
version = 3                       # specify which version of Uniswap to use
provider = 'https://mainnet.infura.io/v3/c696501080344af183d1d2e0c5578ad7'

    # can also be set through the environment variable `PROVIDER`
uniswap = Uniswap(address=address, private_key=private_key, version=version, provider=provider)

# Some token addresses we'll be using later in this guide
eth = "0x0000000000000000000000000000000000000000"
bat = "0x0D8775F648430679A709E98d2b0Cb6250d2887EF"
dai = "0x6B175474E89094C44Da98b954EedeAC495271d0F"
