import smartpy as sp

MetadataUrl = "ipfs://bafkreidqlylpt6hi22d6ghzeh7qzfltmkehuvf4zorpjzkxxpolunbuv6a"
ADMIN = sp.address("tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb")

class Fundraising(sp.Contract):
    def __init__(self):
        self.init(
            admin = ADMIN,
            fundings = sp.big_map(
                tkey = sp.TAddress,
                tvalue = sp.TMutez
            ),
            metadata = sp.utils.metadata_of_url(MetadataUrl)
        )
        
    @sp.entry_point
    def default(self):
        sp.send(self.data.admin, sp.amount)

    @sp.entry_point
    def set_baker(self, baker):
        sp.verify(sp.sender == self.data.admin, "NOT_ADMIN")
        sp.set_delegate(baker)
    
    @sp.entry_point
    def fund(self):
        sp.if ~self.data.fundings.contains(sp.sender):
            self.data.fundings[sp.sender] = sp.amount
        sp.else:
            self.data.fundings[sp.sender] += sp.amount

    @sp.entry_point
    def withdraw(self, target, amount, usage):
        sp.set_type(usage, sp.TBytes)
        sp.verify(sp.sender == self.data.admin, "NOT_ADMIN")
        sp.send(target, amount)
        sp.emit(usage, "admin_withdraw")

@sp.add_test(name = "NTU DApps 2024 Fundraising")
def test():
    scenario = sp.test_scenario()

    c = Fundraising()
    scenario += c


