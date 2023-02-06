// import DEAL_REWARDER_ABI from "../contracts/DealRewarder.json";
// import type { DealRewarder } from "../contracts/types";
// import useContract from "./useContract";

// export default function useDealRewarderContract(tokenAddress?: string) {
//   return useContract<DealRewarder>(tokenAddress, DEAL_REWARDER_ABI);
// }

import DEAL_REWARDER_ABI from "../contracts/RenewalDealRewarder.json";
import type { RenewalDealRewarder } from "../contracts/types";
import useContract from "./useContract";

export default function useDealRewarderContract(tokenAddress?: string) {
  return useContract<RenewalDealRewarder>(tokenAddress, DEAL_REWARDER_ABI);
}
