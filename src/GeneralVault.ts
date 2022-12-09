import { Claim, CollectFees, Deposit, ReBalance, Withdraw, ChangeOperator} from "../generated/templates/Vault/Vault";
import { ClaimEntity, CollectFeesEntity, DepositEntity, PositionEntity, WithdrawEntity, OverviewEntity, OperatorEntity } from "../generated/schema";

export function handleReBalance(event: ReBalance): void {
  let trans_hash = event.transaction.hash.toHexString() + "-" + event.logIndex.toString();
  let position = new PositionEntity(trans_hash);
  position.gp = event.params.sender.toHexString();
  position.vault = event.params.vault.toHexString();
  position.lowerTick = event.params.lowerTick;
  position.upperTick = event.params.upperTick;
  position.timestamp = event.block.timestamp;
  position.save();

  let overview = OverviewEntity.load(position.vault);
  if (overview == null) {
    overview = new OverviewEntity(position.vault);
  }
  overview.positionAdjustCount++;
  overview.save();
}

export function handleDeposit(event: Deposit): void {
  let trans_hash = event.transaction.hash.toHexString() + "-" + event.logIndex.toString();
  let deposit = new DepositEntity(trans_hash);
  deposit.user = event.params.user.toHexString();
  deposit.vault = event.params.vault.toHexString();
  deposit.share = event.params.share;
  deposit.amount0 = event.params.amount0;
  deposit.amount1 = event.params.amount1;
  deposit.actual0 = event.params.actual0;
  deposit.actual1 = event.params.actual1;
  deposit.currentTick = event.params.currentTick;
  deposit.timestamp = event.block.timestamp;
  deposit.save();

  let overview = OverviewEntity.load(deposit.vault);
  if (overview == null) {
    overview = new OverviewEntity(deposit.vault);
  }
  overview.depositAmount0 = overview.depositAmount0 + deposit.actual0;
  overview.depositAmount1 = overview.depositAmount1 + deposit.actual1;
  overview.save();
}

export function handleWithdraw(event: Withdraw): void {
  let trans_hash = event.transaction.hash.toHexString() + "-" + event.logIndex.toString();
  let withdraw = new WithdrawEntity(trans_hash);
  withdraw.user = event.params.user.toHexString();
  withdraw.vault = event.params.vault.toHexString();
  withdraw.liquidity = event.params.liquidity;
  withdraw.baseAmount0 = event.params.baseAmount0;
  withdraw.baseAmount1 = event.params.baseAmount1;
  withdraw.tokenLeft0 = event.params.tokenLeft0;
  withdraw.tokenLeft1 = event.params.tokenLeft1;
  withdraw.balance = event.params.reserveLiquidity;
  withdraw.currentTick = event.params.currentTick;
  withdraw.timestamp = event.block.timestamp;
  withdraw.save();

  let overview = OverviewEntity.load(withdraw.vault);
  if (overview == null) {
    overview = new OverviewEntity(withdraw.vault);
  }
  overview.withrawAmount0 = overview.withrawAmount0 + withdraw.baseAmount0;
  overview.withrawAmount1 = overview.withrawAmount1 + withdraw.baseAmount1;
  overview.save();
}

export function handleClaim(event: Claim): void {
  let trans_hash = event.transaction.hash.toHexString() + "-" + event.logIndex.toString();
  let claim = new ClaimEntity(trans_hash);
  claim.user = event.params.user.toHexString();
  claim.vault = event.params.vault.toHexString();
  claim.liquidity = event.params.liquidity;
  claim.tokenLeft0 = event.params.tokenLeft0;
  claim.tokenLeft1 = event.params.tokenLeft1;
  claim.currentTick = event.params.currentTick;
  claim.timestamp = event.block.timestamp;
  claim.save();

  let overview = OverviewEntity.load(claim.vault);
  if (overview == null) {
    overview = new OverviewEntity(claim.vault);
  }
  overview.userEarned0 = overview.userEarned0 + claim.tokenLeft0;
  overview.userEarned1 = overview.userEarned1 + claim.tokenLeft1;
  overview.save();
}

export function handleCollectFees(event: CollectFees): void {
  let trans_hash = event.transaction.hash.toHexString() + "-" + event.logIndex.toString();
  let collectFees = new CollectFeesEntity(trans_hash);
  collectFees.user = event.params.sender.toHexString();
  collectFees.vault = event.params.vault.toHexString();
  collectFees.feesFromPool0 = event.params.feesFromPool0;
  collectFees.feesFromPool1 = event.params.feesFromPool1;
  collectFees.balance0 = event.params.balance0;
  collectFees.balance1 = event.params.balance1;
  collectFees.currentTick = event.params.currentTick;
  collectFees.timestamp = event.block.timestamp;
  collectFees.save();
}

export function handleChangeOperator(event: ChangeOperator): void {
  let trans_hash = event.transaction.hash.toHexString() + "-" + event.logIndex.toString();
  let operator = new OperatorEntity(trans_hash);
  operator.owner = event.params.sender.toHexString();
  operator.vault = event.params.vault.toHexString();
  operator.operator = event.params.operator.toHexString();
  operator.status = event.params.status;
  operator.currentTick = event.params.currentTick;
  operator.timestamp = event.block.timestamp;
  operator.save();
}

