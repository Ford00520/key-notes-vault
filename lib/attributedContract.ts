import type {
  Abi,
  ContractFunctionArgs,
  ContractFunctionName,
  WriteContractParameters
} from 'viem'
import { withAttributionSuffix } from './wagmi'

export function attributedWriteContract<
  const abi extends Abi,
  functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'>,
  args extends ContractFunctionArgs<abi, 'nonpayable' | 'payable', functionName>
>(request: WriteContractParameters<abi, functionName, args>) {
  return withAttributionSuffix(request)
}
