import smartpy as sp

MetadataUrl = "ipfs://bafkreidqlylpt6hi22d6ghzeh7qzfltmkehuvf4zorpjzkxxpolunbuv6a"
ADMIN = sp.address("tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb")

@sp.module
def main():
    class Fundraising(sp.Contract):
        def __init__(self, admin, metadata):
            self.data.admin = admin
            self.data.fundings = sp.big_map({})
            sp.cast(self.data.fundings, sp.big_map[sp.address, sp.mutez])
            self.data.metadata = metadata

        @sp.entrypoint
        def default(self):
            sp.send(self.data.admin, sp.amount)

        @sp.entry_point
        def set_baker(self, baker):
            assert sp.sender == self.data.admin, "NOT_ADMIN"
            sp.set_delegate(baker)
        
        @sp.entry_point
        def fund(self):
            if not self.data.fundings.contains(sp.sender):
                self.data.fundings[sp.sender] = sp.amount
            else:
                self.data.fundings[sp.sender] += sp.amount

        @sp.entry_point
        def withdraw(self, target, amount, usage):
            assert sp.sender == self.data.admin, "NOT_ADMIN"
            sp.cast(usage, sp.bytes)
            sp.send(target, amount)
            sp.emit(usage, tag="admin_withdraw")


if "main" in __name__:

    @sp.add_test()
    def test():
        scenario = sp.test_scenario("NTU DApps 2024 Fundraising", main)
        metadata = sp.scenario_utils.metadata_of_url(MetadataUrl)
        c1 = main.Fundraising(ADMIN, metadata)
        scenario += c1
