import blockcypher


def getWalletAmount(wallet):
    return blockcypher.get_address_details(wallet)
