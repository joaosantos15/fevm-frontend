// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;
import {MarketAPI} from "@zondax/filecoin-solidity/contracts/v0.8/MarketAPI.sol";
import {CommonTypes} from "@zondax/filecoin-solidity/contracts/v0.8/types/CommonTypes.sol";
import {MarketTypes} from "@zondax/filecoin-solidity/contracts/v0.8/types/MarketTypes.sol";
import {Actor} from "@zondax/filecoin-solidity/contracts/v0.8/utils/Actor.sol";
import {Misc} from "@zondax/filecoin-solidity/contracts/v0.8/utils/Misc.sol";
error RenewalDealRewarder__DealHasGap();
error RenewalDealRewarder__ShortDeal();
struct MockDeal {
int64 start;
int64 end;
bool isSet; // used to check if a key exists on the mockDeals mapping
}
/* 
Contract Usage
    Step   |   Who   |    What is happening  |   Why 
    ------------------------------------------------
    Deploy | contract owner   | contract owner deploys address is owner who can call addCID  | create contract setting up rules to follow
    AddCID | data pinners     | set up cids that the contract will incentivize in deals      | add request for a deal in the filecoin network, "store data" function
    Fund   | contract funders |  add FIL to the contract to later by paid out by deal        | ensure the deal actually gets stored by providing funds for bounty hunter and (indirect) storage provider
    Claim  | bounty hunter    | claim the incentive to complete the cycle                    | pay back the bounty hunter for doing work for the contract
*/
contract RenewalDealRewarder {
// Manage contract state
mapping(bytes => bool) public cidSet;
mapping(bytes => uint256) public cidSizes;
mapping(bytes => mapping(uint64 => bool)) public cidProviders;
mapping(uint64 => MockDeal) public mockDeals;
int64 public totalDealLenghtInDays;
uint64[] public deals;
// Used for sending FIL to SP
address public owner;
address constant CALL_ACTOR_ID = 0xfe00000000000000000000000000000000000005;
uint64 constant DEFAULT_FLAG = 0x00000000;
uint64 constant METHOD_SEND = 0;
    MockDeal public realDeal;
constructor() {
        owner = msg.sender;
        MockDeal memory mockDeal_good = MockDeal(566000, 1008000, true);
        MockDeal memory mockDeal_bad = MockDeal(580000, 1008000, true);
/*
        Using deal 815 as base - https://hyperspace.filecoin.tools/828
        cid: baga6ea4seaqnupvghghlrsipmgb3aitbm5wxezqsl3kxptmxdsa2sdhahjwdmhq
        cid (raw): 0x000181e203922020da3ea6398eb8c90f6183b02261676d7266125ed577cd971c81a90ce03a6c361e
        size (32GB): 34359738368
        */
        mockDeals[3001] = mockDeal_good;
        mockDeals[5001] = mockDeal_bad;
    }
function fund(uint64 unused) public payable {}
function getDaysFromEpochs (int64 epochs) public pure returns (int64) {
int64 oneDayInSeconds = 60 * 60 * 24;
int64 epochsInDays = (epochs * 30) / oneDayInSeconds;
return epochsInDays;
    }
function addCID(
bytes calldata cidraw,
uint256 size,
int64 total_deal_length_in_days
    ) public {
require(msg.sender == owner);
        cidSet[cidraw] = true;
        cidSizes[cidraw] = size;
        totalDealLenghtInDays = total_deal_length_in_days;
    }
function policyOK(bytes memory cidraw, uint64 provider)
internal
view
returns (bool)
    {
bool alreadyStoring = cidProviders[cidraw][provider];
return !alreadyStoring;
    }
function authorizeData(
bytes memory cidraw,
uint64 provider,
uint256 size
    ) public {
require(cidSet[cidraw], "cid must be added before authorizing");
require(cidSizes[cidraw] == size, "data size must match expected");
require(
policyOK(cidraw, provider),
"deal failed policy check: has provider already claimed this cid?"
        );
        cidProviders[cidraw][provider] = true;
    }
function attach_renewal_statement(uint64 dealId) public {
/*
            Add Deal ID to list of 
            TODO: Maybe let SP claim first deal, then store their ID and validate that only that SP can add more deals
        */
if (dealId == 3001 || dealId == 5001) {
            deals.push(dealId);
return;
        }
        MarketTypes.GetDealDataCommitmentReturn memory commitmentRet = MarketAPI
            .getDealDataCommitment(dealId);
        MarketTypes.GetDealProviderReturn memory providerRet = MarketAPI
            .getDealProvider(dealId);
authorizeData(
            commitmentRet.data,
            providerRet.provider,
            commitmentRet.size
        );
        deals.push(dealId);
    }
function call_actor_id(
uint64 method,
uint256 value,
uint64 flags,
uint64 codec,
bytes memory params,
uint64 id
    )
public
returns (
bool,
int256,
uint64,
bytes memory
        )
    {
        (bool success, bytes memory data) = address(CALL_ACTOR_ID).delegatecall(
abi.encode(method, value, flags, codec, params, id)
        );
        (int256 exit, uint64 return_codec, bytes memory return_value) = abi
            .decode(data, (int256, uint64, bytes));
return (success, exit, return_codec, return_value);
    }
// send 1 FIL to the filecoin actor at actor_id
function send(uint64 actorID) public {
bytes memory emptyParams = "";
delete emptyParams;
uint256 oneFIL = 1000000000000000000;
call_actor_id(
            METHOD_SEND,
            oneFIL,
            DEFAULT_FLAG,
            Misc.NONE_CODEC,
            emptyParams,
            actorID
        );
    }
// Joao's mock functions
function debug_getRealDealLength(uint64 dealId) public {
        MarketTypes.GetDealTermReturn memory dealTerm = MarketAPI.getDealTerm(
            dealId
        );
        MockDeal memory deal = MockDeal(dealTerm.start, dealTerm.end, true);
        realDeal = deal;
    }
function addMockDeal(
uint64 dealId,
int64 start,
int64 end
    ) public {
        MockDeal memory mockDeal = MockDeal(start, end, true);
        mockDeals[dealId] = mockDeal;
    }
function claim_full_bounty() public {
require(deals.length > 0, "There should be at least 1 deal");
uint64 firstDealId = deals[0];
        MarketTypes.GetDealTermReturn memory dealTerm = MarketAPI.getDealTerm(
            firstDealId
        );
int64 firstDealStart = dealTerm.start;
int64 firstDealEnd = dealTerm.start + dealTerm.end; // end is actually duration
int64 currentLimit = firstDealEnd;
for (uint64 i = 0; i < deals.length; i++) {
int64 start = 0;
int64 end = 0;
uint64 dealId = deals[i];
if (mockDeals[dealId].isSet) {
// is a mock deal, so we use the mock deals start and end
                start = mockDeals[dealId].start;
                end = mockDeals[dealId].start + mockDeals[dealId].end;
            } else {
                dealTerm = MarketAPI.getDealTerm(dealId);
                start = dealTerm.start;
                end = dealTerm.start + dealTerm.end;
            }
if (start > currentLimit) {
revert RenewalDealRewarder__DealHasGap();
            }
if (end >= currentLimit) {
                currentLimit = end;
            }
        }
int64 actualTotalDealLengthInDays = getDaysFromEpochs(currentLimit - firstDealStart);
if (actualTotalDealLengthInDays >= totalDealLenghtInDays) {
            MarketTypes.GetDealClientReturn memory clientRet = MarketAPI
                .getDealClient(firstDealId);
send(clientRet.client);
        } else {
revert RenewalDealRewarder__ShortDeal();
        }
    }
}
